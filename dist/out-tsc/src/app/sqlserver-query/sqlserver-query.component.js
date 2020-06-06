import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import parameters from '../../parameters.json';
var SqlserverQueryComponent = /** @class */ (function () {
    function SqlserverQueryComponent() {
        this.parametersList = parameters;
    }
    SqlserverQueryComponent.prototype.ngOnInit = function () {
    };
    SqlserverQueryComponent = tslib_1.__decorate([
        Component({
            selector: 'app-sqlserver-query',
            templateUrl: './sqlserver-query.component.html',
            styleUrls: ['./sqlserver-query.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SqlserverQueryComponent);
    return SqlserverQueryComponent;
}());
export { SqlserverQueryComponent };
//# sourceMappingURL=sqlserver-query.component.js.map