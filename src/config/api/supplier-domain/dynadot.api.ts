import { IBackendRes } from "@/types/model/base/base.d";
import { IDynadot } from "@/types/model/dynadotModel/dynadot.d";
import { IHistoryOrder } from "@/types/model/historyOrderModel/historyOrder.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { INSDynadot } from "@/types/model/dynadotModel/nsDynadot.d";
import { IDomainDynadot } from "@/types/model/dynadotModel/domainDynadot.d";

export const callCreateDynadot = (dynadot: IDynadot) => {
    return axios.post<IBackendRes<IDynadot>>('/api/v1/dynadots', { ...dynadot })
}

export const callUpdateDynadot = (dynadot: IDynadot, id: string) => {
    return axios.patch<IBackendRes<IDynadot>>(`/api/v1/dynadots/${id}`, { ...dynadot })
}

export const callUpdateIsOpenDynadot = (id: string, isOpen: boolean) => {
    return axios.patch<IBackendRes<IDynadot>>(`/api/v1/dynadots/updateIsOpen/${id}?isOpen=${isOpen}`)
}

export const callUpdateNSDynadot = (NSDynadot: INSDynadot, id: string) => {
    return axios.patch<IBackendRes<IDomainDynadot>>(`/api/v1/dynadots/updateNSDynadot`, { ...NSDynadot })
}

export const callDeleteDynadot = (id: string) => {
    return axios.delete<IBackendRes<IDynadot>>(`/api/v1/dynadots/${id}`);
}

export const callFetchDynadot = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IDynadot>>>(`/api/v1/dynadots?${query}`);
}

export const callFetchDynadotById = (id: string) => {
    return axios.get<IBackendRes<IDynadot>>(`/api/v1/dynadots/${id}`);
}

export const searchDomainDynadot = (domain: string) => {
    return axios.get<IBackendRes<IDomainDynadot[]>>(`/api/v1/dynadots/search-domain/${domain}`);
}

export const callFetchHistoryOrder = (id: string, query: string) => {
    return axios.get<IBackendRes<IHistoryOrder[]>>(`/api/v1/dynadots/historyOrder/${id}?${query}`);
}

export const callFetchAllDynadot = () => {
    return axios.get<IBackendRes<IDynadot[]>>(`/api/v1/dynadots/getAllDynadot`);
}

export const callReloadBalanceDynadot = (id: string) => {
    return axios.get<IBackendRes<IDynadot>>(`/api/v1/dynadots/reloadBalance/${id}`)
}