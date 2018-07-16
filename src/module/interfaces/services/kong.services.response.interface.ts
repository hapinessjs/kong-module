import { KongServiceResponse } from './kong.service.response.inteface';

export interface KongServicesResponse {
    next: string | null;
    data: KongServiceResponse[];
    offset?: string;
}
