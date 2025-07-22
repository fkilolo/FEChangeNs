export interface ICreateCustomRuleCloudflare {
    zoneId?: string;
    token?: string;
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
}