import { IBasic } from "../base/base.d";
export interface ICart extends IBasic {
    _id?: string;
    isClose?: boolean;
    accountBuy?: {
        _id?: string;
        name?: string;
    }
    cartInfo?: {
        supplier: string;
        domain: string;
        priceUSD?: number;
        priceVND?: number;
        renewalUSD?: number;
        isBuy?: boolean;
        message?: string;
    }[];
}