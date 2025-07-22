import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { IUpdateNameNameservers } from "@/types/model/nameModel/updateNameserver.d";
import { INamecheap } from "@/types/model/neamcheapModel/neamcheap.d";

export const callCreateNamecheap = (namecheap: INamecheap) => {
    return axios.post<IBackendRes<INamecheap>>('/api/v1/name-cheaps', { ...namecheap })
}

export const callUpdateNamecheap = (namecheap: INamecheap, id: string) => {
    return axios.patch<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/${id}`, { ...namecheap })
}

export const callDeleteNamecheap= (id: string) => {
    return axios.delete<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/${id}`);
}

export const callFetchNamecheap = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<INamecheap>>>(`/api/v1/name-cheaps?${query}`);
}

export const callFetchNamecheapById = (id: string) => {
    return axios.get<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/${id}`);
}

export const callUpdateIsOpenNamecheap = (id: string, isOpen: boolean) => {
    return axios.patch<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/updateIsOpen/${id}?isOpen=${isOpen}`)
}

export const callUpdateNSNamecheap = (NSNamecheap: IUpdateNameNameservers) => {
    return axios.patch<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/updateNSNamecheap`, { ...NSNamecheap })
}

export const callReloadBalanceNamecheap = (id: string) => {
    return axios.get<IBackendRes<INamecheap>>(`/api/v1/name-cheaps/reloadBalance/${id}`)
}