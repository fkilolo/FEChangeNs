export interface IRateLimitCloudflare {
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    id?: string;
    last_updated?: string;
    ref?: string;
    version?: string;
    ratelimit?: {
      characteristics?: string[];
      mitigation_timeout?: string;
      period?: string;
      requests_per_period?: string;
    };
}