import { KongServiceResponse } from './kong.service.response.interface';

export interface KongServicesResponse {
    next: string | null;
    data: KongServiceResponse[];
    offset?: string;
}
