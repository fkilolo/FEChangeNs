import { IBasic } from "../base/base.d";

export interface IUser extends IBasic{
    _id?: string;
    userName?: string;
    password?: string;
    userBusinessId?: string;
    team?: [{
        _id: string;
        name: string;
    }];
    role?: {
        _id: string;
        name: string;
    };
    email: string;
    position: string[];
    status: number;
    telegramName: string;
    telegramId: string;
}