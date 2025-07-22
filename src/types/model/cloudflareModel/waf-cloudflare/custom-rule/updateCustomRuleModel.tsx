export interface IUpdateCustomRuleCloudflare {
    zoneId?: string;
    token?: string;
    ruleId?: string;
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
}