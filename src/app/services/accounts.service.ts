import { IAccount } from '../../interfaces/account.interface';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpMethod, RequestsService } from './requests.service';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    private accountsListUrl = '/accounts/list';
    private accountsUrl = '/accounts';

    constructor(private requestsService: RequestsService,
                private configService: ConfigService) {}

    public async getAccounts(): Promise<IAccount[]> {
        const config = await this.configService.getConfig();
        const accounts: IAccount[] = await this.requestsService.runNotAuthorizedRequest(
            `${config.apiHostWithPort}${this.accountsListUrl}`
        );
        accounts.forEach(account => account.federation += `*${config.stellarFederationDomain}`);
        return accounts;
    }

    public async addAccount(account: IAccount): Promise<any> {
        const config = await this.configService.getConfig();
        return this.requestsService.runAuthorizedRequest(
            `${config.apiHostWithPort}${this.accountsUrl}`,
            HttpMethod.POST,
            account
        );
    }

    public async deleteAccount(federation: string): Promise<any> {
        const config = await this.configService.getConfig();
        return this.requestsService.runAuthorizedRequest(
            `${config.apiHostWithPort}${this.accountsUrl}/${federation}`,
            HttpMethod.DELETE
        );
    }
}
