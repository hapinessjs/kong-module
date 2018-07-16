export interface KongRouteResponse {
    id: string;
    created_at: number;
    updated_at: number;
    protocols: ('http' | 'https')[];
    methods: string[] | null;
    hosts: string[];
    paths: string[] | null;
    regex_priority: number;
    strip_path: boolean;
    preserve_host: boolean;
    service: {
        id: string;
    }
}
