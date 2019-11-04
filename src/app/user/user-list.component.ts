import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
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

  title = 'button-toggle-app';
  selectedValue: String = "Active";
  toggleOptions: Array<String> = ["Active", "Desactive"];

  selectionChanged() {
    this.ngOnInit();
  }

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers(this.selectedValue == "Active" ? true : (this.selectedValue == "Desactive" ? false : true))
      .subscribe((res: any) => {
        if (res) {
          this.user_list = res;
        }
      }, (err) => {
        alert('Faild to load data');
        this.user_list = [];
      });
  }

  openDialog(operation: string, user: User) {
    if (operation == 'add') {
      user = { userFirstName: "", userLastName: "", userEmail: "", userUserName: "", userActive: true };
    }

    var dialogRef = this.dialog.open(AddUserComponent, {
      width: "800px",
      data: {
        dialogUser: user,
        operation: operation
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.ngOnInit();
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
