import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { UserService } from '../../shared/user.service';
import { User, Role } from '../../shared/interfaces';
import { RolesDialog } from '../roles-dialog/roles.dialog';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  added: boolean = null;
  status: string = '';
  userRoles: Role[];
  removable: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogUser: User;
      dialogOperation: string;
    }
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [{ value: this.data.dialogUser.firstName, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.active }, [Validators.required]],
      lastName: [{ value: this.data.dialogUser.lastName, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.active }, [Validators.required]],
      email: [{ value: this.data.dialogUser.email, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.active }, [Validators.required]],
      userName: [{ value: this.data.dialogUser.userName, disabled: true }],
      active: { value: this.data.dialogUser.active }
    });

    (this.data.dialogUser.active) ? this.status = 'Active' : this.status = 'Desactive';

    (this.data.dialogOperation == 'show') ? this.removable = false : this.removable = true;

    (this.data.dialogOperation == 'edit' || this.data.dialogOperation == 'show') ? this.userRoles = this.data.dialogUser.roles : this.userRoles = [];
  }

  validate() {
    if (this.data.dialogOperation == 'add') {
      var newUser = {
        firstName: this.userForm.get("firstName").value,
        lastName: this.userForm.get("lastName").value,
        userName: this.userForm.get("userName").value,
        email: this.userForm.get("email").value,
        active: true,
        roles: this.userRoles
      };

      this.userService.addUser(newUser).subscribe(
        (result: User) => {
          if (result.id != null) {
            this.added = true;
            this.removable = false;
          }
        },
        (err) => {
          alert('Faild to add user');
        });
    }

    if (this.data.dialogOperation == 'edit') {
      var editUser = {
        id: this.data.dialogUser.id,
        firstName: this.userForm.get("firstName").value,
        lastName: this.userForm.get("lastName").value,
        userName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value,
        email: this.userForm.get("email").value,
        active: true,
        roles: this.userRoles
      };

      this.userService.editUser(editUser).subscribe(
        (result: void) => {
          this.added = true;
          this.removable = false;
        },
        (err) => {
          alert('Faild to edit user');
        });
    }
  }

  close() {
    this.added = false;
    this.dialogRef.close();
  }

  activate() {
    this.userForm.patchValue({ activate: true });
    this.validate();
    this.status = 'Active';
  }

  updateUserName() {
    this.userForm.patchValue({ userName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value });
  }

  removeRole(role: Role) {
    this.userRoles = this.userRoles.filter(item => item.roleId !== role.roleId);
  }

  openRoleDialog() {
    var dialogRef = this.dialog.open(RolesDialog, {
      width: "800px",
      data: {
        userRoles: this.userRoles,
        selectedRole: []
      }
    });

    dialogRef.afterClosed().subscribe(
      (result: Role[]) => {
        if (result != null) {
          this.userRoles = this.userRoles.concat(result);
        } 
      });
  }
}
