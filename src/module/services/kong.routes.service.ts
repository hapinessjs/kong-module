import { HttpService } from '@hapiness/http';
import { Injectable, Inject } from '@hapiness/core';
import { Observable } from 'rxjs';

import '@hapiness/http/observable/add/validateResponse';
import { KongRouteBody, KongRouteResponse, KongRoutesResponse, KongServiceResponse, KongConfig, KONG_MODULE_CONFIG } from '../interfaces';
import { Debugger } from '../utils';

const __debugger = new Debugger('MongooseAdapter');

@Injectable()
export class KongRoutesService {
    private kongAdminUrl: string;

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', '');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getRoute(routeId: string): Observable<KongRouteResponse | undefined> {
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

    public addRoute(routeOptions: KongRouteBody): Observable<KongRouteResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/routes`, { body: routeOptions, json: true })
            .validateResponse<KongRouteResponse>();
    }

    public updateRoute(routeId: string, routeOptions: KongRouteBody): Observable<KongRouteResponse> {
        return this.httpService
            .patch(`${this.kongAdminUrl}/routes/${routeId}`, { body: routeOptions, json: true })
            .validateResponse<KongRouteResponse>();
    }

    public removeRoute(routeId: string): Observable<undefined> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/routes/${routeId}`, { json: true })
            .validateResponse();
    }
}
