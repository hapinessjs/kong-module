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

// import { Entity, Type, Array, Valid, Allow } from '@juneil/entityts';

// export class KongRouteBody extends Entity {
//     @Array(String)
//     @Valid('http', 'https')
//     protocols: ('http' | 'https')[];

//     @Array(String)
//     @Allow(null, undefined)
//     methods?: string[] | null;

//     @Array(String)
//     @Allow(null, undefined)
//     hosts?: string[] | null;


//     @Array(String)
//     @Allow(null, undefined)
//     paths?: string[] | null;

//     @Type(Boolean)
//     strip_path?: boolean;

//     @Type(Boolean)
//     preserve_host?: boolean;

//     @Type(Object)
//     service: {
//         id: string;
//     }
// }
