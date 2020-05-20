import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { UserService } from '../shared/user.service';
import { User, Role } from '../shared/interfaces';
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
      firstName: [{ value: this.data.dialogUser.userFirstName, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.userActive }, [Validators.required]],
      lastName: [{ value: this.data.dialogUser.userLastName, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.userActive }, [Validators.required]],
      email: [{ value: this.data.dialogUser.userEmail, disabled: this.data.dialogOperation == 'show' || !this.data.dialogUser.userActive }, [Validators.required]],
      userName: [{ value: this.data.dialogUser.userUserName, disabled: true }],
      active: { value: this.data.dialogUser.userActive }
    });

    (this.data.dialogUser.userActive) ? this.status = 'Active' : this.status = 'Desactive';

    (this.data.dialogOperation == 'show') ? this.removable = false : this.removable = true;

    (this.data.dialogOperation == 'edit' || this.data.dialogOperation == 'show') ? this.userRoles = this.data.dialogUser.userRoles : this.userRoles = [];
  }

  validate() {
    if (this.data.dialogOperation == 'add') {
      var newUser = {
        userFirstName: this.userForm.get("firstName").value,
        userLastName: this.userForm.get("lastName").value,
        userUserName: this.userForm.get("userName").value,
        userEmail: this.userForm.get("email").value,
        userActive: true,
        userRoles: this.userRoles
      };

      this.userService.addUser(newUser).subscribe(
        (result: User) => {
          if (result.userId != null) {
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
        userId: this.data.dialogUser.userId,
        userFirstName: this.userForm.get("firstName").value,
        userLastName: this.userForm.get("lastName").value,
        userUserName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value,
        userEmail: this.userForm.get("email").value,
        userActive: true,
        userRoles: this.userRoles
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
