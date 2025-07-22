export interface IDNSDomainCloudflare {
    id?: string;
    comment?: string;
    content?: string;
    created_on?: string;
    meta?: {
        auto_added?: boolean;
        managed_by_apps?: boolean;
        managed_by_argo_tunnel?: boolean;
    };
    modified_on?: string;
    name?: string;
    proxiable?: boolean;
    proxied?: boolean;
    settings?: any;
    tags?: any;
    ttl?: number;
    type?: string;
    zone_id?: string;
    zone_name?: string;
    token?: string;
    zoneId?: string;
}