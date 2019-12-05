import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./user/user-list.component";

import { MatCardModule, MatPaginatorModule, MatIconModule, MatToolbarModule, MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatTabsModule, MatButtonToggleModule, MatRadioModule, MatSelectModule } from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, UserListComponent, AddUserComponent, ConfirmDialog],
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
    MatSelectModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent, ConfirmDialog]
})
export class AppModule {}
