import { KongPluginResponse } from './kong.plugin.response.interface';

export interface KongPluginsResponse {
    next: string | null;
    data: KongPluginResponse[];
    total: number;
    offset?: string;
}
