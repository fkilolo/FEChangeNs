export interface IResWafRuleCloudflare {
    description?: string;
    id?: string;
    kind?: string;
    last_updated?: string;
    name?: string;
    phase?: string;
    rules?: Rules[];
    source?: string;
    version?: string;
  }
  
  class Rules {
    action?: string;
    description?: string;
    enabled?: boolean;
    expression?: string;
    id?: string;
    last_updated?: string;
    ref?: string;
    version?: string;
  }
  