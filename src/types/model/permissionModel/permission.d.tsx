import { IBasic } from "../base/base.d";

export interface IPermission extends IBasic{
    _id?: string;
    name?: string;
    apiPath?: string;
    method?: string;
    module?: string;
}