import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './interfaces';

@Injectable()
export class UserService {

    envUrl = '';

    constructor(private httpClient: HttpClient) {
        this.envUrl = environment.apiUrl;
    }

    getUsers(active: boolean, firstName: String, lastname: String, userName: String, email: String) {
        return this.httpClient.get(this.envUrl + '/users/all/' + active + "/" + firstName + "/" + lastname + "/" + userName + "/" + email);
    }

    addUser(user: User): Observable<object> {
        return this.httpClient.post(this.envUrl + '/users/save', user);
    }

    editUser(user: User): Observable<object> {
        return this.httpClient.put(this.envUrl + '/users/edit/' + user.userId, user);
    }

    getProfiles() {
        return this.httpClient.get(this.envUrl + '/profile');
    }

}