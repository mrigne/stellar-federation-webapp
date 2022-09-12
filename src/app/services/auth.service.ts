import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_COOKIE_NAME } from '../constants/auth.constants';
import { ConfigService } from './config.service';
import { HttpMethod, RequestsService } from './requests.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public urls = {
        signin: '/signin',
        whoami: '/whoami'
    };

    constructor(private configService: ConfigService,
                private cookieService: CookieService,
                private requestsService: RequestsService) {}

    public getCookie(cookieName: string): string {
        return this.cookieService.get(cookieName);
    }

    public async signIn(login: string, password: string): Promise<void> {
            const signInData = {
                login,
                password
            };
            const config = await this.configService.getConfig();
            const response = await this.requestsService.runNotAuthorizedRequest(
                `${config.apiHostWithPort}${this.urls.signin}`,
                HttpMethod.POST,
                signInData);
            const expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (60 * 60 * 1000)); // Expires in 1hr
            this.cookieService.set(AUTH_COOKIE_NAME, `${response.tokenType} ${response.token}`, expireDate);
    }

    public get isUserLoggedIn(): boolean {
        return !!this.authToken;
    }

    public async getCurrentUser(): Promise<any> {
        const config = await this.configService.getConfig();
        return this.requestsService.runAuthorizedRequest(`${config.apiHostWithPort}${this.urls.whoami}`);
    }

    public logout(): void {
        this.cookieService.delete(AUTH_COOKIE_NAME);
    }

    public get authToken(): string {
        return this.cookieService.get(AUTH_COOKIE_NAME);
    }
}
