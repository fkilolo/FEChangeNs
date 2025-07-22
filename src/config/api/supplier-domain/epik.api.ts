import { IBackendRes } from "@/types/model/base/base.d";
import { IEpik } from "@/types/model/epikModel/epik";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';

export const callFetchEpik = (params: any) => {
    return axios.get<IBackendRes<IModelPaginate<IEpik>>>(`/api/v1/epiks?${params}`);
}

export const callCreateEpik = (data: IEpik) => {
    return axios.post<IBackendRes<IEpik>>(`/api/v1/epiks`, data);
}

export const callUpdateEpik = (id: string, data: IEpik) => {
    return axios.patch<IBackendRes<IEpik>>('/api/v1/epiks' + '/' + id, data);
}

export const callRemoveEpik  = (id: string) => {
    return axios.delete<IBackendRes<IEpik>>('/api/v1/epiks' + '/' + id);
}

export const callReloadBalanceEpik = (id: string) => {
    return axios.get<IBackendRes<IEpik>>('/api/v1/epiks/reloadBalance' + '/' + id);
}

export const callUpdateNSEpik = (domain: string, body: any) => {
    return axios.patch<IBackendRes<any>>('/api/v1/epiks/updateNs' + '/' + domain, body);
}

export const callUpdateIsOpenEpik = (id: string, isOpen: boolean) => {
    return axios.patch<IBackendRes<IEpik>>(`/api/v1/epiks/updateIsOpen/${id}?isOpen=${isOpen}`)
}