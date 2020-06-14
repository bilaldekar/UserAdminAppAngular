import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { operationArticle } from '../operations/operation';

@Injectable()
export class OperationsService {

    envUrl = '';

    constructor(private httpClient: HttpClient) {
        this.envUrl = environment.apiUrl;
    }

    getOperationsArticle(): Observable<operationArticle[]> {
        return this.httpClient.get<operationArticle[]>(this.envUrl + '/article');
    }

}