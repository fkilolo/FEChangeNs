export interface IUpdateDNSDomainCloudflare {
    id?: string;
    name?: string;
    token?: string;
    zoneId?: string;
    content?: string;
    proxied?: boolean;
    ttl?: number;
    type?: string;
}