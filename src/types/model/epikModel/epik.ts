import { IBasic } from "../base/base.d";
import { IBalanceEpik } from "./balanceEpik.d";

export interface IEpik extends IBasic {
    _id?: string;
    name?: string;
    userApiSignature?: string;
    balance?: IBalanceEpik;
    exchangeRate?: string;
    team?: [{
        _id: string;
        name: string;
    }];
    isOpen?: boolean;
}