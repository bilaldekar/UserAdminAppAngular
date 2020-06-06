import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from '../../shared/interfaces';
import { UserService } from '../../shared/user.service';
import { RoleService } from '../../shared/role.service';

@Component({
  selector: "roles.dialog",
  templateUrl: "./roles.dialog.html",
  styleUrls: ["./roles.dialog.css"]
})
export class RolesDialog implements OnInit {

  allRoles: Role[] = [];
  selectable = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RolesDialog>,
    private userService: UserService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      userRoles: Role[];
      selectedRole: Role[];
    }
  ) { }

  ngOnInit() {
    this.roleService.getRoles().subscribe((res: Role[]) => {
      if (res) {
        this.allRoles = res;
        this.data.userRoles.forEach(element => {
          this.allRoles = this.allRoles.filter(item => item.roleId !== element.roleId);
        });
      }
    }, (err) => {
      alert('Faild to load data');
      this.allRoles = [];
    });

  }

  changeSelected(selected: Role) {
    selected.state = !selected.state;
    if (selected.state) {
      this.data.selectedRole.push(selected);

      const index = this.data.userRoles.indexOf(selected);
      if (index >= 0) {
        this.data.userRoles.splice(index, 1);
      };

    } else {
      this.data.userRoles.push(selected);

      const index = this.data.selectedRole.indexOf(selected);
      if (index >= 0) {
        this.data.selectedRole.splice(index, 1);
      };
    }
  }

  close() {
    this.data.selectedRole.forEach(element => {
      console.log('finale state : ' + element.roleDescription + element.state);
    });
  }
}
