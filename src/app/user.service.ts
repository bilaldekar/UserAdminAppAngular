import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user/user';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getActiveUsers() {
        return this.httpClient.get('http://localhost:8888/api/users');
    }

    addUser(user: User): Observable<object> {
        return this.httpClient.post('http://localhost:8888/api/users', user);
    }

    editUser(user : User) : Observable<object> {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //       'Content-Type': 'application/json'
        //     }),
        //     params: null
        //   };
        return this.httpClient.put('http://localhost:8888/api/users/' + user.userId, user);
    }
}