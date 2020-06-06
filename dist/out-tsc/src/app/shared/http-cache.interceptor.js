import * as tslib_1 from "tslib";
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';
import { Injectable } from '@angular/core';
var HttpCacheInterceptor = /** @class */ (function () {
    function HttpCacheInterceptor(cacheService) {
        this.cacheService = cacheService;
    }
    HttpCacheInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        // pass non cachable requests
        if (req.method != 'GET') {
            console.log('Invalidating cache : ' + req.method + req.url);
            this.cacheService.unvalidateCache();
            return next.handle(req);
        }
        //attempt to retreive cache response
        var cachedResponse = this.cacheService.get(req.url);
        //return cached response
        if (cachedResponse) {
            console.log('Returning cached response : ' + cachedResponse);
            return of(cachedResponse);
        }
        // send request to server and add response to cache
        return next.handle(req)
            .pipe(tap(function (event) {
            if (event instanceof HttpResponse) {
                console.log('adding item to cache: ' + req.url);
                _this.cacheService.put(req.url, event);
            }
        }));
    };
    HttpCacheInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpCacheService])
    ], HttpCacheInterceptor);
    return HttpCacheInterceptor;
}());
export { HttpCacheInterceptor };
//# sourceMappingURL=http-cache.interceptor.js.map