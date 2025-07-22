import { IBackendRes } from "@/types/model/base/base.d";
import { IDomainLog } from "@/types/model/domainLogModel/domainLog.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';

export const callCreateDomainLog = (orderLog: IDomainLog) => {
    return axios.post<IBackendRes<IDomainLog>>('/api/v1/domain-logs', { ...orderLog })
}

export const callFetchDomainLog = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IDomainLog>>>(`/api/v1/domain-logs?${query}`);
}

export const callFetchDomainLogById = (id: string) => {
    return axios.get<IBackendRes<IDomainLog>>(`/api/v1/domain-logs/${id}`);
}