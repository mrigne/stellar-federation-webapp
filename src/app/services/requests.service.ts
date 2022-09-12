import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_NAME } from '../constants/auth.constants';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    constructor(private cookieService: CookieService,
                private http: HttpClient) {}

    public async runNotAuthorizedRequest<T = any, U = any>(url: string, method = HttpMethod.GET, body?: T): Promise<U> {
        switch (method) {
            case HttpMethod.GET:
                return this.http.get<U>(url).toPromise();
            case HttpMethod.POST:
                return this.http.post<U>(url, body).toPromise();
            case HttpMethod.PUT:
                return this.http.put<U>(url, body).toPromise();
            case HttpMethod.DELETE:
                return this.http.delete<U>(url).toPromise();
        }
    }

    public async runAuthorizedRequest<T = any, U = any>(url: string, method = HttpMethod.GET, body?: T): Promise<U> {
        const options = {
            headers: {
                Authorization: `${this.cookieService.get(AUTH_COOKIE_NAME)}`
            }
        };
        switch (method) {
            case HttpMethod.GET:
                return this.http.get<U>(url, options).toPromise();
            case HttpMethod.POST:
                return this.http.post<U>(url, body, options).toPromise();
            case HttpMethod.PUT:
                return this.http.put<U>(url, body, options).toPromise();
            case HttpMethod.DELETE:
                return this.http.delete<U>(url, options).toPromise();
        }
    }
}

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}
