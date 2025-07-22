import { IBasic } from "../base/base.d";

export interface INameConnection extends IBasic {
  _id?: string;
  name?: string;
  username?: string;
  token?: string;
  team?: [{
    _id: string;
    name: string;
  }];
  exchangeRate?: number;
  isOpen?: boolean;
}