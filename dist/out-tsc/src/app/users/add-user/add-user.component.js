import * as tslib_1 from "tslib";
import { Component, Inject } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { UserService } from '../../shared/user.service';
import { RolesDialog } from '../roles-dialog/roles.dialog';
var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(dialog, dialogRef, userService, fb, data) {
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.fb = fb;
        this.data = data;
        this.added = null;
        this.status = '';
    }
    AddUserComponent.prototype.ngOnInit = function () {
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
    };
    AddUserComponent.prototype.validate = function () {
        var _this = this;
        if (this.data.dialogOperation == 'add') {
            var newUser = {
                userFirstName: this.userForm.get("firstName").value,
                userLastName: this.userForm.get("lastName").value,
                userUserName: this.userForm.get("userName").value,
                userEmail: this.userForm.get("email").value,
                userActive: true,
                userRoles: this.userRoles
            };
            this.userService.addUser(newUser).subscribe(function (result) {
                if (result.userId != null) {
                    _this.added = true;
                    _this.removable = false;
                }
            }, function (err) {
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
            this.userService.editUser(editUser).subscribe(function (result) {
                _this.added = true;
                _this.removable = false;
            }, function (err) {
                alert('Faild to edit user');
            });
        }
    };
    AddUserComponent.prototype.close = function () {
        this.added = false;
        this.dialogRef.close();
    };
    AddUserComponent.prototype.activate = function () {
        this.userForm.patchValue({ activate: true });
        this.validate();
        this.status = 'Active';
    };
    AddUserComponent.prototype.updateUserName = function () {
        this.userForm.patchValue({ userName: this.userForm.get("firstName").value + '.' + this.userForm.get("lastName").value });
    };
    AddUserComponent.prototype.removeRole = function (role) {
        this.userRoles = this.userRoles.filter(function (item) { return item.roleId !== role.roleId; });
    };
    AddUserComponent.prototype.openRoleDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(RolesDialog, {
            width: "800px",
            data: {
                userRoles: this.userRoles,
                selectedRole: []
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != null) {
                _this.userRoles = _this.userRoles.concat(result);
            }
        });
    };
    AddUserComponent = tslib_1.__decorate([
        Component({
            selector: "app-add-user",
            templateUrl: "./add-user.component.html",
            styleUrls: ["./add-user.component.css"]
        }),
        tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            MatDialogRef,
            UserService,
            FormBuilder, Object])
    ], AddUserComponent);
    return AddUserComponent;
}());
export { AddUserComponent };
//# sourceMappingURL=add-user.component.js.map