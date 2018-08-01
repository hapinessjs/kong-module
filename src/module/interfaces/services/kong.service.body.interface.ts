export interface KongServiceBody {
    name?: string;

    protocol?: string;

    host?: string;

    port?: number;

    path?: string;

    retries?: number;

    connect_timeout?: number;

    write_timeout?: number;

    read_timeout?: number;

    url?: string;
}
