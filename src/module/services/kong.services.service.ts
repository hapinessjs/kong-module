import { Inject, Injectable } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import '@hapiness/http/observable/add/validateResponse';
import { Observable } from 'rxjs';
import {
    KongConfig,
    KongRoutesResponse,
    KongServiceBody,
    KongServiceResponse,
    KongServicesResponse,
    KONG_MODULE_CONFIG
} from '../interfaces';
import { Debugger } from '../utils';


const __debugger = new Debugger('MongooseAdapter');

@Injectable()
export class KongServicesService {
    private kongAdminUrl: string;

    constructor(
        private httpService: HttpService,
        @Inject(KONG_MODULE_CONFIG) private config: KongConfig
    ) {
        __debugger.debug('constructor', 'Entering KongServicesService#constructor');
        this.kongAdminUrl = this.config.adminSecureUrl || this.config.adminUrl;
    }

    public getService(serviceName: string): Observable<KongServiceResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/services/${serviceName}`, { json: true })
            .validateResponse<KongServiceResponse>();
    }

    public getServices(): Observable<KongServicesResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/services`, { json: true })
            .validateResponse<KongServicesResponse>();
    }

    public getServiceRoutes(serviceName: string): Observable<KongRoutesResponse> {
        return this.httpService
            .get(`${this.kongAdminUrl}/services/${serviceName}/routes`, { json: true })
            .validateResponse<KongRoutesResponse>();
    }

    public addService(serviceOptions: KongServiceBody): Observable<KongServiceResponse> {
        return this
            .httpService
            .post(`${this.kongAdminUrl}/services`, { body: serviceOptions, json: true })
            .validateResponse<KongServiceResponse>();
    }

    public updateService(serviceName: string, serviceOptions: KongServiceBody): Observable<KongServiceResponse> {
        return this
            .httpService
            .patch(`${this.kongAdminUrl}/services/${serviceName}`, { body: serviceOptions, json: true })
            .validateResponse<KongServiceResponse>();
    }

    public removeService(serviceName: string): Observable<undefined> {
        return this.httpService
            .delete(`${this.kongAdminUrl}/services/${serviceName}`, { json: true })
            .validateResponse();
    }
}
