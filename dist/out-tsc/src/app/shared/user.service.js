import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
var UserService = /** @class */ (function () {
    function UserService(httpClient) {
        this.httpClient = httpClient;
        this.envUrl = '';
        this.envUrl = environment.apiUrl;
    }
    UserService.prototype.getUsers = function (active, firstName, lastname, userName, email) {
        return this.httpClient.get(this.envUrl + '/users/all/' + active + "/" + firstName + "/" + lastname + "/" + userName + "/" + email);
    };
    UserService.prototype.addUser = function (user) {
        return this.httpClient.post(this.envUrl + '/users/save', user);
    };
    UserService.prototype.editUser = function (user) {
        return this.httpClient.put(this.envUrl + '/users/edit/' + user.userId, user);
    };
    UserService.prototype.getUser = function (id) {
        return this.httpClient.get(this.envUrl + '/users/' + id);
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map