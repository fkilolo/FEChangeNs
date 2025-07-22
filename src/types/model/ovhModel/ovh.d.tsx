import { IBasic } from "../base/base.d";

export interface IOvh extends IBasic {
  _id?: string;
  name?: string;
  email?: string;
  team?: [
    {
      _id: string;
      name: string;
    }
  ];
  token?: 
    {
      OVH_APP_KEY: string;
      OVH_APP_SECRET: string;
      OVH_CONSUMER_KEY: string;
    }
  ; 
  total_domain?: number;
}

