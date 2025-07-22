import { IBasic } from "../base/base.d";

export interface IBunny extends IBasic {
  _id?: string;
  name?: string;
  email?: string;
  team?: [
    {
      _id: string;
      name: string;
    }
  ];
  token?: string;
  total_domain?: number;
}
