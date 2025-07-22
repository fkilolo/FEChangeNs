import { IBasic } from "../base/base.d";

export interface IOrderCreateUpdate extends IBasic {
    _id?: string;
    name?: string;
    code?: string;
    status?: {
        _id: string;
        name: string;
        code: string;
    };
    brand?: {
        _id: string;
        name: string;
    };
    team?: {
        _id: string;
        name: string;
    };
    businessDomainId?: string; 
    businessDomainName?: string; 
    cart?: string;
    totalPriceUSD?: number;
    totalPriceVND?: number;
    note?: string;
}