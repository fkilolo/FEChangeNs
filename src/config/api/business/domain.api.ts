import { IBackendRes } from "@/types/model/base/base.d";
import { IDomain } from "@/types/model/domainModel/domain.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { IWhoISDomain } from "@/types/model/domainModel/whoISDomain.d";

export const callCreateDomain = (domain: IDomain) => {
    return axios.post<IBackendRes<IDomain>>('/api/v1/domains', { ...domain })
}

export const callUpdateDomain = (domain: IDomain, id: string) => {
    return axios.patch<IBackendRes<IDomain>>(`/api/v1/domains/${id}`, { ...domain })
}

export const callDeleteDomain = (id: string) => {
    return axios.delete<IBackendRes<IDomain>>(`/api/v1/domains/${id}`);
}

export const callFetchDomain = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IDomain>>>(`/api/v1/domains?${query}`);
}

export const callFetchDomainById = (id: string) => {
    return axios.get<IBackendRes<IDomain>>(`/api/v1/domains/${id}`);
}

export const synchronizeDomainByName = (name: string) => {
    return axios.get<IBackendRes<IDomain>>(`/api/v1/domains/getSynchronizeDomainByName?name=${name}`)
}

export const synchronizeDomain = () => {
    return axios.get<IBackendRes<IDomain>>(`/api/v1/domains/getSynchronizeDomain`)
}

export const callFetchWhoIsDomain = (query: string) => {
    return axios.get<IBackendRes<IWhoISDomain>>(`/api/v1/domains/getWhoIsDomain?domain=${query}`);
}

export const callFetchDNSDomain = (query: string) => {
    return axios.get<IBackendRes<any>>(`/api/v1/domains/getDNSDomain?domain=${query}`);
}

