import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { HttpCacheService } from './http-cache.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // pass non cachable requests
        if (req.method != 'GET') {
            console.log('Invalidating cache : ' + req.method + req.url)
            this.cacheService.unvalidateCache();
            return next.handle(req);
        }

        //attempt to retreive cache response
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

        //return cached response
        if (cachedResponse) {
            console.log('Returning cached response : ' + cachedResponse);
            return of(cachedResponse)
        }

        // send request to server and add response to cache
        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log('adding item to cache: ' + req.url);
                        this.cacheService.put(req.url, event)
                    }
                })
            )
    }

}