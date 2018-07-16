import { HttpService } from '@hapiness/http';
import { Injectable, Inject } from '@hapiness/core';
import { Observable } from 'rxjs';

import '@hapiness/http/observable/add/validateResponse';
import { KongConsumerBody, KongConsumerResponse, KongConsumersResponse, KONG_MODULE_CONFIG, KongConfig } from '../interfaces';
import { Debugger } from '../utils';

const __debugger = new Debugger('MongooseAdapter');

@Injectable()
export class KongConsumersService {
    private kongAdminUrl: string;

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', '');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getConsumer(consumerName: string): Observable<KongConsumerResponse | undefined> {
        return this.httpService
            .get(`${this.kongAdminUrl}/consumers/${consumerName}`, { json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public getConsumers(): Observable<KongConsumersResponse | undefined> {
        return this.httpService
            .get(`${this.kongAdminUrl}/consumers`, { json: true })
            .validateResponse<KongConsumersResponse>();
    }

    public addConsumer(consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/consumers`, { body: consumerOptions, json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public upsertConsumer(consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this.httpService
            .put(`${this.kongAdminUrl}/consumers`, { body: consumerOptions, json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public updateConsumer(consumerName: string, consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this.httpService
            .patch(`${this.kongAdminUrl}/consumers/${consumerName}`, { body: consumerOptions, json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public removeConsumer(consumerName: string): Observable<undefined> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/consumers/${consumerName}`, { json: true })
            .validateResponse(null);
    }

}
