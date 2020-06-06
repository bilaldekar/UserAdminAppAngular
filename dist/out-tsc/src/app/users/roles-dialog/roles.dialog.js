import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../shared/user.service';
import { RoleService } from '../../shared/role.service';
var RolesDialog = /** @class */ (function () {
    function RolesDialog(dialog, dialogRef, userService, roleService, data) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.roleService = roleService;
        this.data = data;
        this.allRoles = [];
        this.selectable = true;
    }
    RolesDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.roleService.getRoles().subscribe(function (res) {
            if (res) {
                _this.allRoles = res;
                _this.data.userRoles.forEach(function (element) {
                    _this.allRoles = _this.allRoles.filter(function (item) { return item.roleId !== element.roleId; });
                });
            }
        }, function (err) {
            alert('Faild to load data');
            _this.allRoles = [];
        });
    };
    RolesDialog.prototype.changeSelected = function (selected) {
        selected.state = !selected.state;
        if (selected.state) {
            this.data.selectedRole.push(selected);
            var index = this.data.userRoles.indexOf(selected);
            if (index >= 0) {
                this.data.userRoles.splice(index, 1);
            }
            ;
        }
        else {
            this.data.userRoles.push(selected);
            var index = this.data.selectedRole.indexOf(selected);
            if (index >= 0) {
                this.data.selectedRole.splice(index, 1);
            }
            ;
        }
    };
    RolesDialog.prototype.close = function () {
        this.data.selectedRole.forEach(function (element) {
            console.log('finale state : ' + element.roleDescription + element.state);
        });
    };
    RolesDialog = tslib_1.__decorate([
        Component({
            selector: "roles.dialog",
            templateUrl: "./roles.dialog.html",
            styleUrls: ["./roles.dialog.css"]
        }),
        tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            MatDialogRef,
            UserService,
            RoleService, Object])
    ], RolesDialog);
    return RolesDialog;
}());
export { RolesDialog };
//# sourceMappingURL=roles.dialog.js.map