import * as tslib_1 from "tslib";
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MatPaginatorModule, MatDialog } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './shared/user.service';
describe('AppComponent', function () {
    var mockUserService;
    var MockAddUserComponent = /** @class */ (function () {
        function MockAddUserComponent() {
        }
        MockAddUserComponent.prototype.open = function () {
            return {
                afterClosed: function () { return console.log('dialog closed'); }
            };
        };
        MockAddUserComponent = tslib_1.__decorate([
            Component({
                selector: "app-add-user",
                template: "<div></div>"
            })
        ], MockAddUserComponent);
        return MockAddUserComponent;
    }());
    beforeEach(async(function () {
        mockUserService = jasmine.createSpyObj(['getUsers', 'addUser']);
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatPaginatorModule,
                NgxPaginationModule,
            ],
            declarations: [
                AppComponent, UserListComponent
            ],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: MatDialog, useClass: MockAddUserComponent }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));
    it('should create the app', function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it("should have as title 'UserAdminApp'", function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('User Administraion App');
    });
    /*it('should render title in a h1 tag', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Welcome to UserAdminApp!');
    });*/
});
//# sourceMappingURL=app.component.spec.js.map