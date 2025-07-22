import { IBasic } from "../base/base.d";

export interface ITelegram extends IBasic{
    _id?: string;
    name?: string;
    code?: string;
    telegramGroupId?: number;
    telegramKey?: string;
}