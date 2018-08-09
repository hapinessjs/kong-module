export interface KongPluginBody {
    name?: string;

    consumer_id?: string;

    service_id?: string;

    route_id?: string;

    config: any;

    enabled?: boolean;
}
