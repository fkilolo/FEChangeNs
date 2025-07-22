export interface ICreateDdosCloudflare {
    zoneId?: string;
    token?: string;
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    action_parameters?: {
        id?: string;
        overrides?: {
            action?: string;
            sensitivity_level?: string;
        };
    }
}