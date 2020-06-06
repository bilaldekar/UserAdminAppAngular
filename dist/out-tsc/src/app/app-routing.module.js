import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SqlserverQueryComponent } from './sqlserver-query/sqlserver-query.component';
var routes = [
    { path: '', redirectTo: "/welcome", pathMatch: "full" },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UserListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sqlserver-query', component: SqlserverQueryComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map