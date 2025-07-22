export interface ICreatePageRuleCloudflare {
    token?: string;
    zone_id?: string;
    actions?: ActionDto[];
    targets?: TargetDto[];
    status?: string;
}

class ActionValueDto {
    status_code?: number;
    url?: string;
}

class ActionDto {
    id?: string;
    value?: ActionValueDto;
}

class ConstraintDto {
    operator?: string;
    value?: string;
}

class TargetDto {
    constraint?: ConstraintDto;
    target?: string;
}