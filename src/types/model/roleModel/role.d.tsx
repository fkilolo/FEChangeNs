import { IBasic } from "../base/base.d";
import { IPermission } from "../permissionModel/permission.d";

export interface IRole extends IBasic{
    _id?: string;
    name: string;
    description: string;
    isActive: boolean;
    permissions: IPermission[] | string[];
}