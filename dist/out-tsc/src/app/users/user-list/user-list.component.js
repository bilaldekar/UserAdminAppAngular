import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddUserComponent } from "../add-user/add-user.component";
import { UserService } from '../../shared/user.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { Store, select } from '@ngrx/store';
import * as userState from '../../state/user.reducer';
import * as userActions from '../../state/user.actions';
import { takeWhile } from 'rxjs/operators';
var UserListComponent = /** @class */ (function () {
    function UserListComponent(dialog, userService, store) {
        this.dialog = dialog;
        this.userService = userService;
        this.store = store;
        this.user_list = [];
        this.page = 1;
        this.title = 'button-toggle-app';
        this.selectedValue = "Active";
        this.toggleOptions = ["Active", "Desactive"];
        this.firstName = null;
        this.lastName = null;
        this.userName = null;
        this.email = null;
        this.componentActive = true;
    }
    UserListComponent.prototype.selectionChanged = function () {
        this.filter();
    };
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.pipe(select(userState.getFilterBy), takeWhile(function () { return _this.componentActive; })).subscribe(function (filterBy) {
            _this.selectedValue = filterBy;
        });
        this.filter();
    };
    UserListComponent.prototype.filter = function () {
        var _this = this;
        this.userService.getUsers(this.selectedValue == "Active" ? true : (this.selectedValue == "Desactive" ? false : true), this.firstName == '' ? null : this.firstName, this.lastName == '' ? null : this.lastName, this.userName == '' ? null : this.userName, this.email == '' ? null : this.email)
            .subscribe(function (res) {
            if (res) {
                _this.user_list = res;
            }
        }, function (err) {
            alert('Faild to load data');
            _this.user_list = [];
        });
        this.store.dispatch(new userActions.FilterBy(this.selectedValue));
    };
    UserListComponent.prototype.openDialog = function (operation, user) {
        var _this = this;
        if (operation == 'add') {
            user = { userFirstName: "", userLastName: "", userEmail: "", userUserName: "", userActive: true, userRoles: null };
        }
        var dialogRef = this.dialog.open(AddUserComponent, {
            width: "800px",
            data: {
                dialogUser: user,
                dialogOperation: operation
            },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null) {
                _this.ngOnInit();
            }
        });
    };
    UserListComponent.prototype.openConfirmDialog = function (user) {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDialog, {
            width: "600px",
            data: { delete: false },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null) {
                user.userActive = result.active;
                _this.userService.editUser(user).subscribe(function (result) {
                    _this.user_list = _this.user_list.filter(function (item) { return item.userId != user.userId; });
                }, function (err) {
                    alert('Faild to deactivate user');
                });
            }
        });
    };
    UserListComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    UserListComponent = tslib_1.__decorate([
        Component({
            selector: "app-user-list",
            templateUrl: "./user-list.component.html",
            styleUrls: ["./user-list.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            UserService,
            Store])
    ], UserListComponent);
    return UserListComponent;
}());
export { UserListComponent };
//# sourceMappingURL=user-list.component.js.map