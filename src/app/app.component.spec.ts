import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MatPaginatorModule, MatDialog } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './shared/user.service';

describe('AppComponent', () => {
  
  let mockUserService;

  @Component({
    selector: "app-add-user",
    template: "<div></div>"
  })
  class MockAddUserComponent {
    open() {
      return {
        afterClosed: () => console.log('dialog closed')
      };
    }
  }

  beforeEach(async(() => {
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'UserAdminApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('User Administraion App');
  });

  /*it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to UserAdminApp!');
  });*/
});
