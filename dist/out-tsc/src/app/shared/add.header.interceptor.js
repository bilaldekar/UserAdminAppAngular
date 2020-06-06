var AddHeaderInterceptor = /** @class */ (function () {
    function AddHeaderInterceptor() {
    }
    AddHeaderInterceptor.prototype.intercept = function (req, next) {
        console.log('AddHeaderInterceptor - ' + req.url);
        var jsonReq = req.clone({
            setHeaders: { 'Content-Type': 'application/json' }
        });
        return next.handle(jsonReq);
    };
    return AddHeaderInterceptor;
}());
export { AddHeaderInterceptor };
//# sourceMappingURL=add.header.interceptor.js.map