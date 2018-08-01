import { HttpService } from '@hapiness/http';
import { Injectable, Inject } from '@hapiness/core';
import { Observable } from 'rxjs';

import '@hapiness/http/observable/add/validateResponse';
import { KongPluginBody, KongPluginResponse, KongPluginsResponse, KONG_MODULE_CONFIG, KongConfig } from '../interfaces';
import { Debugger, filterAllowedKeyInObject } from '../utils';

const __debugger = new Debugger('KongPluginsService');

@Injectable()
export class KongPluginsService {
    private kongAdminUrl: string;
    private allowedKeys = [
        'name',
        'consumer_id',
        'service_id',
        'route_id',
        'config',
        'enabled'
    ];

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', '');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getPlugin(pluginId: string): Observable<KongPluginResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/plugins/${pluginId}`, { json: true })
            .validateResponse<KongPluginResponse>();
    }

    public getPlugins(): Observable<KongPluginsResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/plugins`, { json: true })
            .validateResponse<KongPluginsResponse>();
    }

    public getEnabledPlugins(): Observable<{ enabled_plugins: string[] }> {
        return this.httpService
            .get(`${this.kongAdminUrl}/plugins/enabled`, { json: true })
            .validateResponse<{ enabled_plugins: string[] }>();
    }

    public getPluginSchema(pluginName: string): Observable<{ fields: { [key: string]: any } }> {
        return this.httpService
            .get(`${this.kongAdminUrl}/plugins/schema/${pluginName}`, { json: true })
            .validateResponse<{ fields: { [key: string]: any } }>();
    }

    public addPlugin(pluginOptions: KongPluginBody): Observable<KongPluginResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/plugins`, { body: filterAllowedKeyInObject(this.allowedKeys, pluginOptions), json: true })
            .validateResponse<KongPluginResponse>();
    }

    public upsertPlugin(pluginOptions: KongPluginBody): Observable<KongPluginResponse> {
        return this.httpService
            .put(`${this.kongAdminUrl}/plugins`, { body: filterAllowedKeyInObject(this.allowedKeys, pluginOptions), json: true })
            .validateResponse<KongPluginResponse>();
    }

    public updatePlugin(pluginId: string, pluginOptions: KongPluginBody): Observable<KongPluginResponse> {
        return this.httpService
            .patch(`${this.kongAdminUrl}/plugins/${pluginId}`, {
                body: filterAllowedKeyInObject(this.allowedKeys, pluginOptions),
                json: true
            })
            .validateResponse<KongPluginResponse>();
    }

    public removePlugin(pluginId: string): Observable<void> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/plugins/${pluginId}`, { json: true })
            .validateResponse();
    }
}
