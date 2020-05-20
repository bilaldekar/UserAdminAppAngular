import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Role } from './interfaces';

@Injectable()
export class RoleService {

    envUrl = '';

    constructor(private httpClient: HttpClient) {
        this.envUrl = environment.apiUrl;
    }

    getRoles() : Observable<Role[]> {
        return this.httpClient.get<Role[]>(this.envUrl + '/roles/all/');
    }
}