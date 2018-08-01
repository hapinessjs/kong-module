import { KongConsumerResponse } from './kong.consumer.response.interface';

export interface KongConsumersResponse {
    next: string | null;
    data: KongConsumerResponse[];
    total: number;
    offset?: string;
}
