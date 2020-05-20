import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  //this service add/retreive/delete from cache
  private requests: any = {};

  constructor() { }

  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url];
  }

  unvalidate(url: string): void {
    this.requests[url] = undefined;
  }
  unvalidateCache(): void {
    this.requests = {};
  }
}
