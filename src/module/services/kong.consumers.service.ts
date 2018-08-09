import { HttpService } from '@hapiness/http';
import { Injectable, Inject } from '@hapiness/core';
import { Observable } from 'rxjs';

import '@hapiness/http/observable/add/validateResponse';
import { KongConsumerBody, KongConsumerResponse, KongConsumersResponse, KONG_MODULE_CONFIG, KongConfig } from '../interfaces';
import { Debugger, filterAllowedKeyInObject } from '../utils';

const __debugger = new Debugger('KongConsumersService');

@Injectable()
export class KongConsumersService {
    private kongAdminUrl: string;
    private allowedKeys = [
        'username',
        'custom_id'
    ];

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', '');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getConsumer(consumerName: string): Observable<KongConsumerResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/consumers/${consumerName}`, { json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public getConsumers(): Observable<KongConsumersResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/consumers`, { json: true })
            .validateResponse<KongConsumersResponse>();
    }

    public addConsumer(consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/consumers`, { body: filterAllowedKeyInObject(this.allowedKeys, consumerOptions), json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public upsertConsumer(consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this.httpService
            .put(`${this.kongAdminUrl}/consumers`, { body: filterAllowedKeyInObject(this.allowedKeys, consumerOptions), json: true })
            .validateResponse<KongConsumerResponse>();
    }

    public updateConsumer(consumerName: string, consumerOptions: KongConsumerBody): Observable<KongConsumerResponse> {
        return this.httpService
            .patch(`${this.kongAdminUrl}/consumers/${consumerName}`, {
                body: filterAllowedKeyInObject(this.allowedKeys, consumerOptions),
                json: true
            })
            .validateResponse<KongConsumerResponse>();
    }

    public removeConsumer(consumerNameOrId: string): Observable<void> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/consumers/${consumerNameOrId}`, { json: true })
            .validateResponse();
    }

    public createConsumerApplication<T = any, R = any>(consumerNameOrId: string, pluginName: string, config: T): Observable<R> {
        return this.httpService
            .post(`${this.kongAdminUrl}/consumers/${consumerNameOrId}/${pluginName}`, { json: true, body: config })
            .validateResponse<R>()
    }
}
