export interface IUpdateDdosCloudflare {
    zoneId?: string;
    token?: string;
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    id?: string;
    action_parameters?: {
        id?: string;
        overrides?: {
            action?: string;
            sensitivity_level?: string;
        };
    }
}