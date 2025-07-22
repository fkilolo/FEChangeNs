import { IBasic } from "../base/base.d";

export interface IOrderStatus extends IBasic{
    _id?: string;
    name?: string;
    code?: string;
}