import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces';
import { UserService } from '../shared/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: User | null;
    redirectUrl: string;

    constructor(private userService: UserService) { }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): void {
        //TODO : add password checking
        this.userService.getUsers(true, null, null, userName, null).subscribe((res: User[]) => {
            if (res) {
                this.currentUser = res[0];
            }
        }, (err) => {
            alert('Faild to login');
        });

        /*this.currentUser = {
            userId: 2,
            userFirstName: '',
            userLastName: '',
            userUserName: 'bilal',
            userEmail: '',
            userActive: false
        };*/
    }

    logout(): void {
        this.currentUser = null;
    }
}
