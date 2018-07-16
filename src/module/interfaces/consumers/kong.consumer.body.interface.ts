export interface KongConsumerBody {
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

// import { Entity, Type } from '@juneil/entityts';

// export class KongConsumerBody extends Entity {
//     @Type(String)
//     name?: string;

//     @Type(String)
//     protocol?: string;

//     @Type(String)
//     host?: string;

//     @Type(Number)
//     port?: number;

//     @Type(String)
//     path?: string;

//     @Type(Number)
//     retries?: number;

//     @Type(Number)
//     connect_timeout?: number;

//     @Type(Number)
//     write_timeout?: number;

//     @Type(Number)
//     read_timeout?: number;

//     @Type(String)
//     url?: string;
// }
