import { IBackendRes } from "@/types/model/base/base.d";
import { IGname } from "@/types/model/gname/gname.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { INSGname } from "@/types/model/gname/nsGname.d";

export const callCreateGname = (gname: IGname) => {
    return axios.post<IBackendRes<IGname>>('/api/v1/gnames', { ...gname })
}

export const callUpdateGname = (gname: IGname, id: string) => {
    return axios.patch<IBackendRes<IGname>>(`/api/v1/gnames/${id}`, { ...gname })
}

export const callDeleteGname = (id: string) => {
    return axios.delete<IBackendRes<IGname>>(`/api/v1/gnames/${id}`);
}

export const callFetchGname = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IGname>>>(`/api/v1/gnames?${query}`);
}

export const callFetchGnameById = (id: string) => {
    return axios.get<IBackendRes<IGname>>(`/api/v1/gnames/${id}`);
}

export const callReloadBalanceGname = (id: string) => {
    return axios.get<IBackendRes<IGname>>(`/api/v1/gnames/reloadBalance/${id}`)
}

export const callUpdateNSGname = (NSGname: INSGname) => {
    return axios.patch<IBackendRes<IGname>>(`/api/v1/gnames/updateNSGname`, { ...NSGname })
}

export const callUpdateIsOpenGname = (id: string, isOpen: boolean) => {
    return axios.patch<IBackendRes<IGname>>(`/api/v1/gnames/updateIsOpen/${id}?isOpen=${isOpen}`)
}