import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class QueryService {

    envUrl = '';

    constructor(private httpClient: HttpClient) {
        this.envUrl = environment.apiUrl;
    }

    getParameters(): Observable<any> {
        return this.httpClient.get<any>(this.envUrl + '/parameters');
    }

    /*editUser(user: User): Observable<void> {
        return this.httpClient.put<void>(this.envUrl + '/users/edit/' + user.id, user);
    }*/

}