import { HttpService } from '@hapiness/http';
import { Injectable, Inject } from '@hapiness/core';
import { Observable } from 'rxjs';

import '@hapiness/http/observable/add/validateResponse';
import {
    KongRouteBody,
    KongRouteResponse,
    KongRoutesResponse,
    KongServiceResponse,
    KongConfig,
    KONG_MODULE_CONFIG,
    KongPluginsResponse
} from '../interfaces';
import { Debugger, filterAllowedKeyInObject } from '../utils';

const __debugger = new Debugger('KongRoutesService');

@Injectable()
export class KongRoutesService {
    private kongAdminUrl: string;
    private allowedKeys = [
        'protocols',
        'methods',
        'hosts',
        'paths',
        'strip_path',
        'preserve_host',
        'service'
    ];

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', '');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getRoute(routeId: string): Observable<KongRouteResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/routes/${routeId}`, { json: true })
            .validateResponse<KongRouteResponse>();
    }

    public getRoutes(): Observable<KongRoutesResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/routes`, { json: true })
            .validateResponse<KongRoutesResponse>();
    }

    public getServiceFromRouteId(routeId: string): Observable<KongServiceResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/routes/${routeId}/service`, { json: true })
            .validateResponse<KongServiceResponse>();
    }

    public getPluginsFromRouteId(routeId: string): Observable<KongPluginsResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/routes/${routeId}/plugins`, { json: true })
            .validateResponse<KongPluginsResponse>();
    }

    public addRoute(routeOptions: KongRouteBody): Observable<KongRouteResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/routes`, { body: filterAllowedKeyInObject(this.allowedKeys, routeOptions), json: true })
            .validateResponse<KongRouteResponse>();
    }

    public updateRoute(routeId: string, routeOptions: KongRouteBody): Observable<KongRouteResponse> {
        return this.httpService
            .patch(`${this.kongAdminUrl}/routes/${routeId}`, { body: filterAllowedKeyInObject(this.allowedKeys, routeOptions), json: true })
            .validateResponse<KongRouteResponse>();
    }

    public removeRoute(routeId: string): Observable<void> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/routes/${routeId}`, { json: true })
            .validateResponse();
    }
}
