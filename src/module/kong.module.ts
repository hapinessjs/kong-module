import { HapinessModule, CoreModuleWithProviders, Inject, OnRegister } from '@hapiness/core';
import { KongConsumersService, KongPluginsService, KongRoutesService, KongServicesService } from './services';
import { KongConfig, KONG_MODULE_CONFIG } from './interfaces';
import { Observable } from 'rxjs';

@HapinessModule({
    version: '1.1.1',
    declarations: [],
    providers: [
        KongConsumersService,
        KongPluginsService,
        KongRoutesService,
        KongServicesService
    ],
    exports: [
        KongConsumersService,
        KongPluginsService,
        KongRoutesService,
        KongServicesService
    ]
})
export class KongModule implements OnRegister {
    public static setConfig(config: KongConfig): CoreModuleWithProviders {
        return {
            module: KongModule,
            providers: [{ provide: KONG_MODULE_CONFIG, useValue: config }]
        }
    }

    constructor(@Inject(KONG_MODULE_CONFIG) private config: KongConfig) { }

    public onRegister(): void | Observable<any> {
        if (!this.config.adminUrl && !this.config.adminSecureUrl) {
            return Observable.throw('Kong module requires an adminUrl or an adminSecureUrl');
        }

        if (!this.config.proxyUrl && !this.config.proxySecureUrl) {
            return Observable.throw('Kong module requires a proxyUrl or a proxySecureUrl');
        }
    }
}
