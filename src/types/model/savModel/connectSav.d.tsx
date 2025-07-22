import { IBasic } from "../base/base.d";

export interface IConnectSav {
    _id?: string;
    name?: string;
    apikey?: string;
    userName?: string;
    total_domain?: number;
  
    // Copy lại các trường từ IBasic nếu cần
    createdBy?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deleted?: boolean;
    __v?: number;
  }
  
