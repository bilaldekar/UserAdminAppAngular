import * as tslib_1 from "tslib";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { MatCardModule, MatPaginatorModule, MatIconModule, MatToolbarModule, MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatTabsModule, MatButtonToggleModule, MatRadioModule, MatSelectModule, MatChipsModule } from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmDialog } from './users/confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';
import { RolesDialog } from './users/roles-dialog/roles.dialog';
import { RoleService } from './shared/role.service';
import { AddHeaderInterceptor } from './shared/add.header.interceptor';
import { HttpCacheService } from './shared/http-cache.service';
import { HttpCacheInterceptor } from './shared/http-cache.interceptor';
import { LogResponseInterceptor } from './shared/log-response.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { MenuComponent } from './home/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SqlserverQueryComponent } from './sqlserver-query/sqlserver-query.component';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                UserListComponent,
                AddUserComponent,
                ConfirmDialog,
                RolesDialog,
                LoginComponent,
                WelcomeComponent,
                MenuComponent,
                SqlserverQueryComponent
            ],
            imports: [
                CommonModule,
                BrowserModule,
                AppRoutingModule,
                ReactiveFormsModule,
                FormsModule,
                MatCardModule,
                MatPaginatorModule,
                NgxPaginationModule,
                BrowserAnimationsModule,
                MatToolbarModule,
                MatIconModule,
                MatTableModule,
                MatButtonModule,
                MatDialogModule,
                MatFormFieldModule,
                MatInputModule,
                MatGridListModule,
                MatTabsModule,
                HttpClientModule,
                MatButtonToggleModule,
                MatRadioModule,
                MatSelectModule,
                MatChipsModule,
                StoreModule.forRoot({}),
                StoreModule.forFeature('users', reducer),
                StoreDevtoolsModule.instrument({
                    name: 'dev tools',
                    maxAge: 25,
                    logOnly: environment.production
                }),
                ButtonModule,
                MenubarModule,
                PanelModule,
                InputTextModule
            ],
            providers: [
                UserService,
                RoleService,
                HttpCacheService,
                { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true }
            ],
            bootstrap: [AppComponent],
            entryComponents: [AddUserComponent, ConfirmDialog, RolesDialog]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map