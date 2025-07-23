import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IDomainSav } from "@/types/model/savModel/domainSav.d";
import axios from "config/axios-customize";


// Cập nhật kết nối theo ID
export const callUpdateDomainSav = (id: string, data: IDomainSav) => {
  return axios.patch<IBackendRes<IDomainSav>>(`/api/v1/sav/update-nameservers`, data);
};

export const callUpdateAllDomainSav = (id: string, data: IDomainSav) => {
  return axios.patch<IBackendRes<IDomainSav>>(`/api/v1/sav/update-all-nameservers`, data);
};
// Lấy danh sách phân trang
export const callFetchDomainSav = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IDomainSav>>>(`/api/v1/sav/domains?${query}`);
};

