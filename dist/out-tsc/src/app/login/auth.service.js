import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';
var AuthService = /** @class */ (function () {
    function AuthService(userService) {
        this.userService = userService;
    }
    AuthService.prototype.isLoggedIn = function () {
        return !!this.currentUser;
    };
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        //TODO : add password checking
        this.userService.getUsers(true, null, null, userName, null).subscribe(function (res) {
            if (res) {
                _this.currentUser = res[0];
            }
        }, function (err) {
            alert('Faild to login');
        });
        /*this.currentUser = {
            userId: 2,
            userFirstName: '',
            userLastName: '',
            userUserName: 'bilal',
            userEmail: '',
            userActive: false
        };*/
    };
    AuthService.prototype.logout = function () {
        this.currentUser = null;
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map