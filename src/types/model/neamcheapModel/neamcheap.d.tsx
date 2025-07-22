import { IBasic } from "../base/base.d";
import { IBalanceNamecheap } from "./balanceNamecheap.d";

export interface INamecheap extends IBasic {
    _id?: string;
    name?: string;
    apiUser?: string;
    userName?: string;
    apiKey?: string;
    clientIp?: string;
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    organization?: string;
    address1?: string;
    city?: string;
    stateProvince?: string;
    stateProvinceChoice?: string;
    zip?: string;
    country?: string;
    phone?: string;
    emailAddress?: string;
    exchangeRate?: number;
    team?: [{
        _id: string;
        name: string;
    }];
    isOpen?: boolean;
    balanceNamecheap?: IBalanceNamecheap;
}