import { IBasic } from "../base/base.d";

export interface IDomainSav {
    _id?: string;
    domain_name?: string;
    ns_1?: string;
    ns_2?: string;
    domainList?: string[];
    // Copy lại các trường từ IBasic nếu cần
    createdBy?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deleted?: boolean;
    __v?: number;
  }
  