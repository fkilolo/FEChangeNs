import { IBackendRes } from "@/types/model/base/base.d";
import { IEnom } from "@/types/model/enomModel/enom.d";
import { IHistoryOrderEnom } from "@/types/model/historyOrderModel/historyOrderEnom.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from "config/axios-customize";

export const callCreateEnom = (enom: IEnom) => {
  return axios.post<IBackendRes<IEnom>>("/api/v1/enoms", { ...enom });
};

export const callUpdateEnom = (enom: IEnom, id: string) => {
  return axios.patch<IBackendRes<IEnom>>(`/api/v1/enoms/${id}`, {
    ...enom,
  });
};

export const callDeleteEnom = (id: string) => {
  return axios.delete<IBackendRes<IEnom>>(`/api/v1/enoms/${id}`);
};

export const callFetchEnom = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IEnom>>>(
    `/api/v1/enoms?${query}`
  );
};

export const callFetchHistoryOrder = (id: string, query: string) => {
  return axios.get<IBackendRes<IHistoryOrderEnom[]>>(
    `/api/v1/enoms/historyOrder/${id}?${query}`
  );
};

export const callUpdateNSEnom = (domain: string, body: any) => {
  return axios.patch<IBackendRes<any>>(
    "/api/v1/enoms/updateNS" + "/" + domain,
    body
  );
};

export const callUpdateIsOpenEnom = (id: string, isOpen: boolean) => {
  return axios.patch<IBackendRes<IEnom>>(`/api/v1/dynadots/updateIsOpen/${id}?isOpen=${isOpen}`)
}
