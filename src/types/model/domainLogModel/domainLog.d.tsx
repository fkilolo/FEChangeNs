import { IBasic } from "../base/base.d";

export interface IDomainLog extends IBasic {
    _id?: string;
    name?: string;
    domain?: {
        _id: string;
        name: string;
    };
    nameServer1?: string;
    nameServer2?: string;
}