
export interface KongPluginResponse {
    id: string;
    service_id: string;
    consumer_id: string;
    route_id: string;
    name: string;
    config: any;
    enabled: boolean;
    created_at: number;
}
