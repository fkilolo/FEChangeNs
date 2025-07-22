export interface ICreateDNSDomainCloudflare {
    name?: string;
    token?: string;
    zoneId?: string;
    content?: string;
    proxied?: boolean;
    ttl?: number;
    type?: string;
}