import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserService } from '../user.service';
import { User } from '../user/user';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  added: boolean = null;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>, private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogUser: User;
      operation: string;
    }
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [{ value: this.data.dialogUser.userFirstName, disabled: this.data.operation == 'show' }, [Validators.required]],
      lastName: [{ value: this.data.dialogUser.userLastName, disabled: this.data.operation == 'show' }, [Validators.required]],
      email: [{ value: this.data.dialogUser.userEmail, disabled: this.data.operation == 'show' }, [Validators.required]],
      userName: [{ value: this.data.dialogUser.userUserName, disabled: true }]
    });
  }

  validate() {
    if (this.data.operation == 'add') {
      var newUser = {
        userFirstName: this.userForm.get("firstName").value,
        userLastName: this.userForm.get("lastName").value,
        userUserName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value,
        userEmail: this.userForm.get("email").value,
        userActive: true
      };

      this.userService.addUser(newUser).subscribe((result: any) => {
        if (result) {
          this.added = true;
        }
      }, (err) => {
        alert('Faild to add user');
      });
    }

    if (this.data.operation == 'edit') {
      var editUser = {
        userId : this.data.dialogUser.userId ,
        userFirstName: this.userForm.get("firstName").value,
        userLastName: this.userForm.get("lastName").value,
        userUserName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value,
        userEmail: this.userForm.get("email").value,
        userActive: true
      };

      this.userService.editUser(editUser).subscribe((editResult) => { 
        if (editResult) {
          this.added = true;
        }
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
}
