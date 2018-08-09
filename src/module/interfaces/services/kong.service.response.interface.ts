
export interface KongServiceResponse {
    id: string;
    created_at: number;
    updated_at: number;
    connect_timeout: number;
    protocol: string;
    host: string;
    port: number;
    path: string;
    name: string;
    retries: number;
    read_timeout: number;
    write_timeout: number;
}
