import { IAccount } from '../../interfaces/account.interface';
import { Injectable } from '@angular/core';
import { HttpMethod, RequestsService } from './requests.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    private accountsUrl = 'https://stellar.igne08.pp.ua:5001/accounts';

    constructor(private requestsService: RequestsService,
                private authService: AuthService) {}

    public async getAccounts(): Promise<IAccount[]> {
        const accounts: IAccount[] = await this.requestsService.runNotAuthorizedRequest(this.accountsUrl);
        accounts.forEach(account => account.federation += '*stellar.igne08.pp.ua');
        return accounts;
    }

    public async addAccount(account: IAccount): Promise<any> {
        return this.requestsService.runAuthorizedRequest(this.accountsUrl, this.authService.authToken, HttpMethod.POST, account);
    }

    public async deleteAccount(federation: string): Promise<any> {
        return this.requestsService.runAuthorizedRequest(
            `${this.accountsUrl}/${federation}`,
            this.authService.authToken,
            HttpMethod.DELETE
        );
    }
}
