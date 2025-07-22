import { IBasic } from "../base/base.d";
import { IBalanceGname } from "./balanceGname.d";

export interface IGname extends IBasic {
    _id?: string;
    name?: string;
    appId?: string;
    appKey?: string;
    exchangeRate?: number;
    balance?: IBalanceGname;
    team?: [{
        _id: string;
        name: string;
    }];
    isOpen?: boolean;
}