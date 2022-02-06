import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpMethod, RequestsService } from './requests.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public static readonly AUTH_COOKIE_NAME = 'stellar-federation-auth';
    public urls = {
        signin: 'https://stellar.igne08.pp.ua:5001/signin',
        whoami: 'https://stellar.igne08.pp.ua:5001/whoami'
    };

    constructor(private cookieService: CookieService,
                private requestsService: RequestsService) {}

    public getCookie(cookieName: string): string {
        return this.cookieService.get(cookieName);
    }

    public async signIn(login: string, password: string): Promise<void> {
            const signInData = {
                login,
                password
            };
            const response = await this.requestsService.runNotAuthorizedRequest(this.urls.signin, HttpMethod.POST, signInData);
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (60 * 60 * 1000)); // Expires in 1hr
            this.cookieService.set(AuthService.AUTH_COOKIE_NAME, `${response.tokenType} ${response.token}`, expireDate);
    }

    public get isUserLoggedIn(): boolean {
        return !!this.authToken;
    }

    public async getCurrentUser(): Promise<any> {
        return this.requestsService.runAuthorizedRequest(this.urls.whoami, this.authToken);
    }

    public logout(): void {
        this.cookieService.delete(AuthService.AUTH_COOKIE_NAME);
    }

    public get authToken(): string {
        return this.cookieService.get(AuthService.AUTH_COOKIE_NAME);
    }
}
