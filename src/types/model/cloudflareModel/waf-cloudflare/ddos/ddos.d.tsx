export interface IDdosCloudflare {
  action?: string;
  description?: string;
  enabled?: boolean;
  expression?: string;
  id?: string;
  last_updated?: string;
  ref?: string;
  version?: string;
  action_parameters?: {
    id?: string;
    overrides?: {
      action?: string;
      sensitivity_level?: string;
    };
    version?: string;
  };
}