export interface KongRouteBody {
    protocols: ('http' | 'https')[];

    methods?: string[] | null;

    hosts?: string[] | null;

    paths?: string[] | null;

    strip_path?: boolean;

    preserve_host?: boolean;

    service: {
        id: string;
    }
}
