export interface KongPluginBody {
    name?: string;

    consumer_id?: string;

    service_id?: string;

    route_id?: string;

    config: any;

    enabled?: boolean;
}

// import { Entity, Type } from '@juneil/entityts';

// export class KongPluginBody extends Entity {
//     @Type(String)
//     name?: string;

//     @Type(String)
//     consumer_id?: string;

//     @Type(String)
//     service_id?: string;

//     @Type(String)
//     route_id?: string;

//     @Type(Object)
//     config: any;

//     @Type(Boolean)
//     enabled?: boolean;
// }
