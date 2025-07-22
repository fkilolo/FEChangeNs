import { IBasic } from "../base/base.d";

export interface IGodaddy extends IBasic {
    _id?: string;
    name?: string;
    shopperId?: string;
    key?: string;
    secret?: string;
    email?: string;
    nameFirst?: string;
    nameLast?: string;
    phone?: string;
    address1?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    state?: string;
    exchangeRate?: number;
    team?: [{
        _id: string;
        name: string;
    }];
    isOpen?: boolean;
}