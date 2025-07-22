import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { IGodaddy } from "@/types/model/godaddyModel/godaddy.d";
import { IUpdateNameNameservers } from "@/types/model/nameModel/updateNameserver.d";

export const callCreateGodaddy = (godaddy: IGodaddy) => {
    return axios.post<IBackendRes<IGodaddy>>('/api/v1/godaddys', { ...godaddy })
}

export const callUpdateGodaddy = (godaddy: IGodaddy, id: string) => {
    return axios.patch<IBackendRes<IGodaddy>>(`/api/v1/godaddys/${id}`, { ...godaddy })
}

export const callDeleteGodaddy= (id: string) => {
    return axios.delete<IBackendRes<IGodaddy>>(`/api/v1/godaddys/${id}`);
}

export const callFetchGodaddy = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IGodaddy>>>(`/api/v1/godaddys?${query}`);
}

export const callFetchGodaddyById = (id: string) => {
    return axios.get<IBackendRes<IGodaddy>>(`/api/v1/godaddys/${id}`);
}

export const callUpdateIsOpenGodaddy = (id: string, isOpen: boolean) => {
    return axios.patch<IBackendRes<IGodaddy>>(`/api/v1/godaddys/updateIsOpen/${id}?isOpen=${isOpen}`)
}

export const callUpdateNSGodaddy = (NSGodaddy: IUpdateNameNameservers) => {
    return axios.patch<IBackendRes<IGodaddy>>(`/api/v1/godaddys/updateNSGodaddy`, { ...NSGodaddy })
}