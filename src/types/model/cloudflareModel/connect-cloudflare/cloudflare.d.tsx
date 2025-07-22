import { IBasic } from "../../base/base.d";
import { IOrganizations } from "./organizations.d";

export interface ICloudflare extends IBasic {
    _id?: string;
    name?: string;
    email?: string;
    organizations?: IOrganizations[];
    team?: [{
        _id: string;
        name: string;
    }];
    token?: string;
    total_domain?: number;
}