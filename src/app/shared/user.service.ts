import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getUsers(active: boolean, firstName: String, lastname: String, userName: String, email: String): Observable<User[]> {
        return this.httpClient.get<User[]>(this.envUrl + '/users/all/' + active + "/" + firstName + "/" + lastname + "/" + userName + "/" + email);
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.envUrl + '/users/save', user);
    }

    editUser(user: User): Observable<void> {
        return this.httpClient.put<void>(this.envUrl + '/users/edit/' + user.userId, user);
    }

    getUser(id: number): Observable<User> {
        return this.httpClient.get<User>(this.envUrl + '/users/' + id);
    }

}