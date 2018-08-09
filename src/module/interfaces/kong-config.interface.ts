import { InjectionToken } from '@hapiness/core';

export const KONG_MODULE_CONFIG = new InjectionToken('kong_module_config');

export interface KongConfig {
    proxyUrl?: string;
    proxySecureUrl?: string;
    adminUrl?: string;
    adminSecureUrl?: string;
}
