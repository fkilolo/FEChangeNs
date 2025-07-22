import { IBackendRes } from "@/types/model/base/base.d";
import { IName } from "@/types/model/nameModel/name.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from "config/axios-customize";
import { IHistoryOrderName } from "@/types/model/nameModel/HistoryOrderName.d";
import {
  INameConnection,
} from "@/types/model/nameModel/nameConnection.d";
import { ICreateName } from "@/types/model/nameModel/createName.d";
import { IUpdateNameNameservers } from "@/types/model/nameModel/updateNameserver.d";

export const callFetchHistoryOrder = (id: string, query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IHistoryOrderName>>>(
    `/api/v1/name/connections/${id}/orders?${query}`
  );
};

export const callCreateNameConnection = (
  nameConnection: INameConnection
) => {
  return axios.post<IBackendRes<IName>>("/api/v1/name/connections", {
    ...nameConnection,
  });
};

export const callFetchNameConnection = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<INameConnection>>>(
    `/api/v1/name/connections?${query}`
  );
};

export const callUpdateNameConnection = (
  id: string,
  nameConnection: INameConnection
) => {
  return axios.patch<IBackendRes<any>>(`/api/v1/name/connections/${id}`, {
    ...nameConnection,
  });
};

export const callDeleteNameConnection = (id: string) => {
  return axios.delete<IBackendRes<any>>(`/api/v1/name/connections/${id}`);
};

export const callCreateName = (nameDomain: ICreateName) => {
  return axios.post<IBackendRes<IName>>("/api/v1/name/domains", {
    ...nameDomain,
  });
};

export const callFetchName = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IName>>>(
    `/api/v1/name/domains?${query}`
  );
};

export const callFetchNameByName = (domainName: string) => {
  return axios.get<IBackendRes<IName>>(`/api/v1/name/domains/${domainName}`);
};

export const updateNameservers = (body: IUpdateNameNameservers) => {
  return axios.patch<IBackendRes<any>>("/api/v1/name/updateNameservers", body);
};

export const callUpdateIsOpenName = (id: string, isOpen: boolean) => {
  return axios.patch<IBackendRes<IName>>(`/api/v1/name/updateIsOpen/${id}?isOpen=${isOpen}`)
}