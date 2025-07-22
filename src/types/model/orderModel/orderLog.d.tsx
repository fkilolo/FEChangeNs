import { IBasic } from "../base/base.d";

export interface IOrderLog extends IBasic {
    _id?: string;
    name?: string;
    order?: {
        _id: string;
        code: string;
    };
    status?: {
        _id: string;
        name: string,
        code: string,
    };
}