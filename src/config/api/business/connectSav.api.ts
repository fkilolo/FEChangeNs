import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IConnectSav } from "@/types/model/savModel/connectSav.d";
import axios from "config/axios-customize";

// Tạo kết nối mới
export const callCreateConnectSav = (data: IConnectSav) => {
  return axios.post<IBackendRes<IConnectSav>>("/api/v1/sav", data);
};

// Cập nhật kết nối theo ID
export const callUpdateConnectSav = (id: string, data: IConnectSav) => {
  return axios.patch<IBackendRes<IConnectSav>>(`/api/v1/sav/${id}`, data);
};

// Xoá kết nối theo ID
export const callDeleteConnectSav = (id: string) => {
  return axios.delete<IBackendRes<IConnectSav>>(`/api/v1/sav/${id}`);
};

// Lấy danh sách phân trang
export const callFetchConnectSav = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IConnectSav>>>(`/api/v1/sav?${query}`);
};

// Lấy kết nối theo ID
export const callFetchConnectSavById = (id: string) => {
  return axios.get<IBackendRes<IConnectSav>>(`/api/v1/sav/${id}`);
};
