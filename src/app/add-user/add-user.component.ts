import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  added: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      operation :string;
    }
  ) {
    console.log('----> ' + this.data.operation);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [{value : this.data.firstName, disabled:this.data.operation == 'show'}, [Validators.required]],
      lastName: [{value :this.data.lastName, disabled:this.data.operation =='show'}, [Validators.required]],
      email: [{value :this.data.email, disabled:this.data.operation=='show'}, [Validators.required]],
      userName: [{ value: this.data.userName, disabled: true }]
    });

    this.added = null;

    console.log('-----> ' + this.userForm.get('firstName').value);
  }

  add() {
    this.added = true;
  }

  terminer() {
    this.data.firstName = this.userForm.get("firstName").value;
    this.data.lastName = this.userForm.get("lastName").value;
    this.data.email = this.userForm.get("email").value;

    this.userForm.patchValue({
      userName:
        this.userForm.get("firstName").value +
        "." +
        this.userForm.get("lastName").value
    });
    this.data.userName = this.userForm.get("userName").value;
  }

  close() {
    this.added = false;
    this.dialogRef.close();
  }
}
