import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.pageTitle = 'User Management';
        this.componentActive = true;
    }
    Object.defineProperty(MenuComponent.prototype, "isLoggedIn", {
        get: function () {
            return this.authService.isLoggedIn();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuComponent.prototype, "userName", {
        get: function () {
            if (this.authService.currentUser) {
                return this.authService.currentUser.userUserName;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    MenuComponent.prototype.ngOnInit = function () {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/welcome']
            },
            {
                label: 'User',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: 'User list', icon: 'pi pi-fw pi-list', routerLink: ['/users'] },
                    { label: 'Roles list', icon: 'pi pi-fw pi-briefcase' }
                ]
            },
            {
                label: 'SQL Query',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Set parameters',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/sqlserver-query']
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog'
            },
            { separator: true },
            {
                label: 'Quit', icon: 'pi pi-fw pi-times'
            }
        ];
    };
    MenuComponent.prototype.logOut = function () {
        this.authService.logout();
        this.router.navigate(['/welcome']);
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        this.componentActive = false;
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'pm-menu',
            templateUrl: './menu.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map