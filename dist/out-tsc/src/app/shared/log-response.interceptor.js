import { HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var LogResponseInterceptor = /** @class */ (function () {
    function LogResponseInterceptor() {
    }
    LogResponseInterceptor.prototype.intercept = function (req, next) {
        console.log('LogResponseInterceptor - ' + req.url);
        return next.handle(req)
            .pipe(tap(function (event) {
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    };
    return LogResponseInterceptor;
}());
export { LogResponseInterceptor };
//# sourceMappingURL=log-response.interceptor.js.map