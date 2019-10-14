import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { User } from "./user";

import { AddUserComponent } from "../add-user/add-user.component";
import { UserService } from '../user.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {

  user_list: User[] = [];
  page: number = 1;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.userService.getActiveUsers().subscribe((res: any) => {
      if (res) {
        this.user_list = res;
      }
    }, (err) => {
      alert('Faild to load data');
      this.user_list = [];
    });
  }

  openDialog(operation: string, user: User) {
    var dialogRef = null;
    if (operation == 'add') {
      dialogRef = this.dialog.open(AddUserComponent, {
        width: "800px",
        data: { firstName: null, lastName: "", email: "", userName: "", operation: operation },
        disableClose: true
      });
    }

    if (operation == 'edit') {
      dialogRef = this.dialog.open(AddUserComponent, {
        width: "800px",
        data: { firstName: user.userFirstName, lastName: user.userLastName, email: user.userEmail, userName: user.userUserName, operation: operation },
        disableClose: true
      });
    }

    if (operation == 'show') {
      dialogRef = this.dialog.open(AddUserComponent, {
        width: "800px",
        data: { firstName: user.userFirstName, lastName: user.userLastName, email: user.userEmail, userName: user.userUserName, operation: operation },
        disableClose: true
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (operation == 'add') {
          var newUser = { userFirstName: result.firstName, userLastName: result.lastName, userUserName: result.userName, userEmail: result.email, userActive: true };
          this.userService.addUser(newUser).subscribe((result: any) => {
            if (result) {
              this.user_list.push(result);
            }
          }, (err) => {
            alert('Faild to add user');
          });
        }

        if (operation == 'edit') {
          user.userFirstName = result.firstName;
          user.userLastName = result.lastName;
          user.userUserName = result.firstName + '.' + result.lastName;
          user.userEmail = result.email;
          user.userActive = true;

          console.log('edit operation ' + result.firstName);


          this.userService.editUser(user).subscribe((editResult) => {}, 
          (err) => {
            alert('Faild to edit user');
          });
        }
      }
    });
  }

  openConfirmDialog(user: User) {
    var dialogRef = this.dialog.open(ConfirmDialog, {
      width: "600px",
      data: { delete: false },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        user.userActive = result.active;

        this.userService.editUser(user).subscribe((editResult) => {
          if (editResult) {
            this.user_list = this.user_list.filter(item => item.userId != (<User>editResult).userId);
          }
        }, (err) => {
          alert('Faild to desactivate user');
        });
      }
    })
  }
}
