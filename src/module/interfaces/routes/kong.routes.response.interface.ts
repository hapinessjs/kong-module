import { KongRouteResponse } from './kong.route.response.interface';

export interface KongRoutesResponse {
    total: number;
    data: KongRouteResponse[];
    next: string | null;
    offset?: string;
}
