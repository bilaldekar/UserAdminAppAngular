import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var RoleService = /** @class */ (function () {
    function RoleService(httpClient) {
        this.httpClient = httpClient;
        this.envUrl = '';
        this.envUrl = environment.apiUrl;
    }
    RoleService.prototype.getRoles = function () {
        return this.httpClient.get(this.envUrl + '/roles/all/');
    };
    RoleService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RoleService);
    return RoleService;
}());
export { RoleService };
//# sourceMappingURL=role.service.js.map