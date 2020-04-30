import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    constructor(private http: HttpClient) {}

    public async runNotAuthorizedRequest(url: string, method = HttpMethod.GET, body?): Promise<any> {
        switch (method) {
            case HttpMethod.GET:
                return this.http.get(url).toPromise();
            case HttpMethod.POST:
                return this.http.post(url, body).toPromise();
            case HttpMethod.PUT:
                return this.http.put(url, body).toPromise();
            case HttpMethod.DELETE:
                return this.http.delete(url).toPromise();
        }
    }

    public async runAuthorizedRequest(url: string, token: string, method = HttpMethod.GET, body?): Promise<any> {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        switch (method) {
            case HttpMethod.GET:
                return this.http.get(url, options).toPromise();
            case HttpMethod.POST:
                return this.http.post(url, body, options).toPromise();
            case HttpMethod.PUT:
                return this.http.put(url, body, options).toPromise();
            case HttpMethod.DELETE:
                return this.http.delete(url, options).toPromise();
        }
    }
}

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}
