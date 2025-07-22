import { IBasic } from "../base/base.d";

export interface ICartCreateUpdate extends IBasic {
    _id?: string;
    accountBuy?: {
        _id?: string;
        name?: string;
    }
    cartInfo?: {
        dynadot?: {
            _id?: string;
            dynadotKey?: string;
            exchangeRate?: number;
            name?: string;
        },
        gname?: {
            _id?: string;
            appId?: string;
            appKey?: string;
            name?: string;
            exchangeRate?: number;
        };
        epik?: {
            _id?: string;
            name?: string;
            userApiSignature?: string;
            exchangeRate?: number;
        };
        enom?: {
            _id?: string;
            name?: string;
            uid?: string;
            pw?: string;
            exchangeRate?: number;
        };
        name?: {
            _id?: string;
            nameUser?: string;
            nameKey?: number;
            exchangeRate?: number;
            name?: number;
        };
        domain?: string;
        priceUSD?: number;
        priceVND?: number;
        renewalUSD?: number;
        message?: string;
    }[];
}