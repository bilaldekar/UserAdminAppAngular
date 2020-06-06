import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var HttpCacheService = /** @class */ (function () {
    function HttpCacheService() {
        //this service add/retreive/delete from cache
        this.requests = {};
    }
    HttpCacheService.prototype.put = function (url, response) {
        this.requests[url] = response;
    };
    HttpCacheService.prototype.get = function (url) {
        return this.requests[url];
    };
    HttpCacheService.prototype.unvalidate = function (url) {
        this.requests[url] = undefined;
    };
    HttpCacheService.prototype.unvalidateCache = function () {
        this.requests = {};
    };
    HttpCacheService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], HttpCacheService);
    return HttpCacheService;
}());
export { HttpCacheService };
//# sourceMappingURL=http-cache.service.js.map