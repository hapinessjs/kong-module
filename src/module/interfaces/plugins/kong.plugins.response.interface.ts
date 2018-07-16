import { KongPluginResponse } from './kong.plugin.response.inteface';

export interface KongPluginsResponse {
    next: string | null;
    data: KongPluginResponse[];
    total: number;
    offset?: string;
}
