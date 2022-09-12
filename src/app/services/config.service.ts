import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';

export interface IConfig {
    apiHostWithPort: string;
    stellarFederationDomain: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private initConfigPromise: Promise<IConfig>;

    constructor(private requestsService: RequestsService) {
    }

    public getConfig(): Promise<IConfig> {
        if (!this.initConfigPromise) {
            this.initConfigPromise = this.requestsService.runNotAuthorizedRequest<void, IConfig>('./assets/config.json');
        }
        return this.initConfigPromise;
    }
}
