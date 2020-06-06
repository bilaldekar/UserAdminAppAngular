import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var ConfirmDialog = /** @class */ (function () {
    function ConfirmDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ConfirmDialog.prototype.ngOnInit = function () { };
    ConfirmDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ConfirmDialog.prototype.onYesClick = function () {
        this.data.active = false;
    };
    ConfirmDialog = tslib_1.__decorate([
        Component({
            selector: 'app-confirm-dialog',
            templateUrl: './confirm-dialog.html'
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ConfirmDialog);
    return ConfirmDialog;
}());
export { ConfirmDialog };
//# sourceMappingURL=confirm-dialog.js.map