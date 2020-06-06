import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { SqlserverQueryComponent } from './sqlserver-query/sqlserver-query.component';

const routes: Routes = [
  { path: '', redirectTo: "/welcome", pathMatch: "full" },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sqlserver-query', component: SqlserverQueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
