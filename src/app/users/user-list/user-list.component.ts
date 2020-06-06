import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddUserComponent } from "../add-user/add-user.component";
import { UserService } from '../../shared/user.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { User } from '../../shared/interfaces';
import { Store, select } from '@ngrx/store';
import * as userState from '../../state/user.reducer'
import * as userActions from '../../state/user.actions'
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {

  user_list: User[] = [];
  page: number = 1;

  title = 'button-toggle-app';
  selectedValue: string = "Active";
  toggleOptions: Array<string> = ["Active", "Desactive"];

  firstName: String = null;
  lastName: String = null;
  userName: String = null;
  email: String = null;

  componentActive = true;

  selectionChanged() {
    this.filter();
  }

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private store: Store<userState.State>) { }

  ngOnInit() {
    this.store.pipe(select(userState.getFilterBy), takeWhile(() => this.componentActive)).subscribe(
      filterBy => {
        this.selectedValue = filterBy;
      }
    )

    this.filter();
  }

  filter() {

    this.userService.getUsers(
      this.selectedValue == "Active" ? true : (this.selectedValue == "Desactive" ? false : true),
      this.firstName == '' ? null : this.firstName,
      this.lastName == '' ? null : this.lastName,
      this.userName == '' ? null : this.userName,
      this.email == '' ? null : this.email)
      .subscribe((res: User[]) => {
        if (res) {
          this.user_list = res;
        }
      }, (err) => {
        alert('Faild to load data');
        this.user_list = [];
      });

    this.store.dispatch(new userActions.FilterBy(this.selectedValue));
  }

  openDialog(operation: string, user: User) {
    if (operation == 'add') {
      user = { firstName: "", lastName: "", email: "", userName: "", active: true, roles: null };
    }

    var dialogRef = this.dialog.open(AddUserComponent, {
      width: "800px",
      data: {
        dialogUser: user,
        dialogOperation: operation
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
        user.active = result.active;

        this.userService.editUser(user).subscribe(
          (result: void) => {
            this.user_list = this.user_list.filter(item => item.id != user.id);
          }, (err) => {
            alert('Faild to deactivate user');
          });
      }
    })
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
}
