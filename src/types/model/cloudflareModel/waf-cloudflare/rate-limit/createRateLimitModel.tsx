export interface ICreateRateLimitCloudflare {
    zoneId?: string;
    token?: string;
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    rateLimit?: {
        characteristics?: string[];
        period?: number;
        requests_per_period?: number;
        mitigation_timeout?: number;
    }
}