export interface IPageRuleCloudflare {
    id?: string;
    targets?: TargetItem[];
    actions?: ActionItem[];
    priority?: number;
    status?: string;
    created_on?: string;
    modified_on?: string;
}

class TargetItem {
    target?: string;
    constraint?: {
        operato?: string;
        value?: string;
    };
}

class ActionItem {
    id?: string;
    value?: {
        url?: string;
        status_code?: number;
    };
}