import { IBasic } from "../base/base.d";
import { IBalanceDynadot } from "./balanceDynadot.d";

export interface IDynadot extends IBasic {
    _id?: string;
    name?: string;
    dynadotKey?: string;
    team?: [{
        _id: string;
        name: string;
    }];
    isOpen?: boolean;
    balanceList?: IBalanceDynadot[];
    exchangeRate?: string;
}