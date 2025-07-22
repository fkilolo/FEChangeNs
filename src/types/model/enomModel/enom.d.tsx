import { IBasic } from "../base/base.d";
import { IBalanceEnom } from "./balanceEnom.d";

export interface IEnom extends IBasic {
  _id?: string;
  name?: string;
  uid?: string;
  pw?: string;
  team?: [{
    _id: string;
    name: string;
}];
  balanceList?: IBalanceEnom[];
  exchangeRate?: string;
  amount?: string;
  currency?: string;
}
