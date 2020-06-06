import { TestBed, ComponentFixture } from "@angular/core/testing"
import { UserListComponent } from './user-list.component'
import { NO_ERRORS_SCHEMA, Component } from "@angular/core";
import { UserService } from '../../shared/user.service';
import { MatDialog, MatCardModule, MatPaginatorModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('user list component', () => {
    let fixture: ComponentFixture<UserListComponent>;
    let mockUserService;
    let USERS;

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

    beforeEach(() => {
        USERS = [
            { userFirstName: "bilal", userLastName: "dekar", userEmail: "gmail.com", userUserName: "bilal.dekar", userActive: true, userProfile: null },
            { userFirstName: "bilal", userLastName: "dekar", userEmail: "gmail.com", userUserName: "bilal.dekar", userActive: true, userProfile: null }
        ]

        mockUserService = jasmine.createSpyObj(['getUsers', 'addUser']);

        TestBed.configureTestingModule({
            declarations: [UserListComponent],
            imports: [
                MatCardModule,
                MatPaginatorModule,
                NgxPaginationModule
            ],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: MatDialog, useClass: MockAddUserComponent }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(UserListComponent);
    })

    it('should do nothing ', () => {
        expect(true).toBe(true);
    })

    it('should have 2 users', () => {
        mockUserService.getUsers.and.returnValue(of(USERS));
        fixture.detectChanges();
        expect(fixture.componentInstance.user_list.length).toBe(2);
    })

    it('should call get users in user service', () => {
        mockUserService.getUsers.and.returnValue(of(USERS));
        fixture.detectChanges();
        expect(mockUserService.getUsers).toHaveBeenCalled();
    })

    it('selected filter initial value should be active', () => {
        expect(fixture.componentInstance.selectedValue).toBe('Active');
    })

    it('should create one row for each user', () => {
        mockUserService.getUsers.and.returnValue(of(USERS))
        fixture.detectChanges();
        let listElement = fixture.debugElement.queryAll(By.css('div.firstname'));
        expect(listElement.length).toBe(2);
    })

    it('first row should display the user with firstname bilal', () => {
        mockUserService.getUsers.and.returnValue(of(USERS))
        fixture.detectChanges();

        let listElement = fixture.debugElement.queryAll(By.css('div.firstname'));
        console.log(listElement[0].nativeElement.textContent);
        expect(listElement[0].nativeElement.textContent).toEqual(' bilal ');
    })
})

