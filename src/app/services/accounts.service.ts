import { IAccount } from '../../interfaces/account.interface';
import { Injectable } from '@angular/core';
import { HttpMethod, RequestsService } from './requests.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    private urls = {
        getAccounts: 'https://stellar.igne08.pp.ua:4443/accounts/list',
        addAccount: 'https://stellar.igne08.pp.ua:4443/accounts/create',
        deleteAccount: 'https://stellar.igne08.pp.ua:4443/accounts/delete'
    };

    constructor(private requestsService: RequestsService,
                private authService: AuthService) {}

    public async getAccounts(): Promise<IAccount[]> {
        const accounts: IAccount[] = await this.requestsService.runNotAuthorizedRequest(this.urls.getAccounts);
        accounts.forEach(account => account.federation += '*stellar.igne08.pp.ua');
        return accounts;
    }

    public async addAccount(account: IAccount): Promise<any> {
        return this.requestsService.runAuthorizedRequest(this.urls.addAccount, this.authService.authToken, HttpMethod.PUT, account);
    }

    public async deleteAccount(federation: string): Promise<any> {
        return this.requestsService.runAuthorizedRequest(
            this.urls.deleteAccount,
            this.authService.authToken,
            HttpMethod.POST,
            { federation }
        );
    }
}
