import { IBasic } from "../base/base.d";

export interface IName extends IBasic {
  domainName?: string;
  locked?: boolean;
  autoRenewEnabled?: boolean;
  expireDate?: Date;
  createDate?: Date;
  renewalPrice?: number;
  contacts?: {
    registrant?: {
      firstName?: string;
      lastName?: string;
    };
  };
}