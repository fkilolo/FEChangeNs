import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IBunny } from "@/types/model/bunnyModel/bunny.d";
import { IPullZone } from "@/types/model/bunnyModel/bunnyPullZone.d";
import { IBunnyZone, IBunnyZoneResponse, IRecordDNS } from "@/types/model/bunnyModel/bunnyZone.d";
import axios from 'config/axios-customize';

export const callCreateBunny = (Bunny: IBunny) => {
    return axios.post<IBackendRes<IBunny>>('/api/v1/bunny', { ...Bunny })
}

export const callUpdateBunny = (Bunny: IBunny, id: string) => {
    return axios.patch<IBackendRes<IBunny>>(`/api/v1/bunny/${id}`, { ...Bunny })
}

export const callDeleteBunny = (id: string) => {
    return axios.delete<IBackendRes<IBunny>>(`/api/v1/bunny/${id}`);
}

export const callFetchBunny = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBunny>>>(`/api/v1/bunny?${query}`);
}

export const callFetchBunnyById = (id: string) => {
    return axios.get<IBackendRes<IBunny>>(`/api/v1/bunny/${id}`);
}

export const callFetchAllBunnyByUser = () => {
    return axios.get<IBackendRes<IBunny[]>>(`/api/v1/bunny/my-bunny`);
}

export const callFetchAllZoneByBunnyId = (id: string, qs: string) => {
    return axios.get<IBackendRes<IBunnyZoneResponse>>(`/api/v1/bunny/zones/${id}?${qs}`);
}

export const callFetchBunnyZone = (id: string, zoneId: string) => {
    return axios.get<IBackendRes<IBunnyZone>>(`/api/v1/bunny/zones/${id}/${zoneId}`);
}

export const callDeleteBunnyZone = (id: string, zoneId: string) => {
    return axios.delete<IBackendRes<IBunnyZone>>(`/api/v1/bunny/zones/${id}/${zoneId}`);
}

export const callAddBunnyZone = (id: string, zone: IBunnyZone) => {
    return axios.post<IBackendRes<IBunnyZone>>(`/api/v1/bunny/zones/${id}`, { ...zone })
}

export const callUpdateBunnyZone = (id: string, zoneId: string, zone: IBunnyZone) => {
    return axios.patch<IBackendRes<IBunnyZone>>(`/api/v1/bunny/zones/${id}/${zoneId}`, { ...zone })
}

export const callDeleteRecord = (id: string, zoneId: string, recordId: string) => {
    return axios.delete<IBackendRes<IBunnyZone>>(`/api/v1/bunny/records/${id}/${zoneId}/${recordId}`);
}

export const callAddRecord = (id: string, zoneId: string, record: IRecordDNS) => {
    return axios.post<IBackendRes<IBunnyZone>>(`/api/v1/bunny/records/${id}/${zoneId}`, { ...record })
}

export const callUpdateRecord = (id: string, zoneId: string, recordId: string, record: IRecordDNS) => {
    return axios.patch<IBackendRes<IBunnyZone>>(`/api/v1/bunny/records/${id}/${zoneId}/${recordId}`, { ...record })
}

export const callChangeCDNAcceleration = (id: string, zoneId: string, recordId: string, Accelerated: boolean,) => {
    return axios.post<IBackendRes<IBunnyZone>>(`/api/v1/bunny/cdn-acceleration/${id}/${zoneId}/${recordId}`, { Accelerated })
}

export const callSetForceSSL = (id: string, hostname: string, force: boolean) => {
    return axios.post<IBackendRes<IBunnyZone>>(`/api/v1/bunny/force-ssl/${id}`, { force, hostname })
}

export const callGetAllPullZone = (id: string) => {
    return axios.get<IBackendRes<IPullZone[]>>(`/api/v1/bunny/pull-zone/${id}`);
}

export const callGetDetailPullZone = (id: string, pullZoneId: string) => {
    return axios.get<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}`);
}

export const callDeletePullZone = (id: string, pullZoneId: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}`);
}

export const callUpdatePullZone = (id: string, pullZoneId: string, pullZone: IPullZone) => {
    return axios.patch<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}`, { ...pullZone });
}

export const callDeleteHostname = (id: string, pullZoneId: string, Hostname: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}/remove-hostname`, { data: { Hostname } });
}

export const callLoadFreeSSL = (id: string, Hostname: string, isDelete: boolean, pullZoneId: string) => {
    return axios.post<IBackendRes<IPullZone>>(`/api/v1/bunny/load-free-ssl/${id}`, { Hostname, pullZoneId, isDelete });
}

export const callPurgeCache = (id: string, pullZoneId: string) => {
    return axios.post<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}/purge-cache`);
}

export const callUpdateBlockIP = (id: string, pullZoneId: string, ip: string, isDelete: boolean) => {
    return axios.post<IBackendRes<IPullZone>>(`/api/v1/bunny/pull-zone/${id}/${pullZoneId}/block-ip`, { ip, isDelete });
}

export const callDeleteEdgeRule = (id: string, pullZoneId: string, ruleId: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`/api/v1/bunny/edge-rule/${id}/${pullZoneId}/${ruleId}`);
}

export const callAddOrUpdateEdgeRule = (id: string, pullZoneId: string, body: any) => {
    return axios.post<IBackendRes<IPullZone>>(`/api/v1/bunny/edge-rule/${id}/${pullZoneId}`, { ...body });
}

export const callCreateZeroSSL = (id: string, domain: string, zoneId: string) => {
    return axios.post<IBackendRes<{ privateKey: string, certificate: string }>>(`/api/v1/bunny/create-zero-ssl/${id}`, { domain, zoneId });
}