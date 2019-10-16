import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user/user';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUsers(active : boolean) {
        return this.httpClient.get('http://localhost:8888/api/users?state=' + active);
    }

    addUser(user: User): Observable<object> {
        return this.httpClient.post('http://localhost:8888/api/users', user);
    }

    editUser(user : User) : Observable<object> {
        return this.httpClient.put('http://localhost:8888/api/users/' + user.userId, user);
    }
}