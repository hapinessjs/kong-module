import { KongConsumerResponse } from './kong.consumer.response.inteface';

export interface KongConsumersResponse {
    next: string | null;
    data: KongConsumerResponse[];
    total: number;
    offset?: string;
}
