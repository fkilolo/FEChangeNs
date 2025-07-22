import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IOvh } from "@/types/model/ovhModel/ovh.d";
import { IOvhZone, IRecordDNS } from "@/types/model/ovhModel/ovhZone.d";
import axios from 'config/axios-customize';

export const callCreateOvh = (Ovh: IOvh) => {
    return axios.post<IBackendRes<IOvh>>('/api/v1/ovh', { ...Ovh })
}

export const callUpdateOvh = (Ovh: IOvh, id: string) => {
    return axios.patch<IBackendRes<IOvh>>(`/api/v1/ovh/${id}`, { ...Ovh })
}

export const callDeleteOvh = (id: string) => {
    return axios.delete<IBackendRes<IOvh>>(`/api/v1/ovh/${id}`);
}

export const callGetActiveOvh = (data: any) => {
    return axios.post<IBackendRes<IOvh>>(`/api/v1/ovh/zone/getActiveLink`, {data});
}
export const callUpdateTotalOvh = () => {
    return axios.patch<IBackendRes<IOvh>>(`/api/v1/ovh/zone/total`);
}

export const callFetchOvh = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IOvh>>>(`/api/v1/ovh?${query}`);
}

export const callFetchOvhById = (id: string) => {
    return axios.get<IBackendRes<IOvh>>(`/api/v1/ovh/${id}`);
}

export const callFetchAllOvhByUser = () => {
    return axios.get<IBackendRes<IOvh[]>>(`/api/v1/ovh/my-Ovh`);
}

export const callFetchAllZoneByOvhId = (id: string, qs: string) => {
    return axios.get<IBackendRes<IOvhZone[]>>(`/api/v1/ovh/zones/${id}?${qs}`);
}

export const callFetchOvhZone = (id: string, zoneId: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/${id}/${zoneId}`);
}

export const callFetchOvhRecords = (id: string, zone: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/records/${id}/${zone}`);
}

export const callDeleteOvhZone = (id: string, zoneId: string) => {
    console.log("domain", zoneId)
    return axios.delete<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/${id}/${zoneId}`);
}

export const callAddOvhZone = (id: string, zone: string) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/${id}`, { zone })
}

export const callDetailOvhZone = (id: string, zone: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/dns/${id}/${zone}`)
}
export const callDetailOvhDomainModify = (id: string, domain: string, host:string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/${id}/${domain}/${host}`)
}
export const callDetail301 = (id: string, domain: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/redirect/${id}/${domain}`)
}
export const callDel301 = (id: string, domain: string, id301:string) => {
    return axios.delete<IBackendRes<IOvhZone>>(`/api/v1/ovh/redirect/${id}/${domain}/${id301}`)
}
export const callPost301 = (id: string, domain: string, body:any) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/redirect/${id}/${domain}`, body)
}
export const callDetailOvhCdnModify = (id: string, domain: string, host:string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/option/${id}/${domain}/${host}`)
}
export const callDetailOvhCdnModifyPost = (id: string, domain: string, host:string, data:any) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/option/${id}/${domain}/${host}`, data)
}
export const callPostNS = (id: string, domain: string, host:string) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/map/postNS/${id}/${domain}/${host}`)
}
export const callGetProxyOvh = (id: string, body:any) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/proxy/${id}`, body)
}
export const callPostProxyOvh = (id: string, body:any) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/proxy/${id}`, body)
}
export const callBuyCDN = (id: string) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/buy/${id}`)
}
export const callGetNS= (id: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ovh/map/getNS/${id}`)
}
export const callDeleteOvhCdnModifyPost = (id: string, domain: string, host:string, ruleName:any) => {
    return axios.delete<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/option/${id}/${domain}/${host}/${ruleName}`)
}
export const callOvhCdnModifyPut = (id: string, domain: string, host:string, ruleName:any, data:any) => {
    return axios.put<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/option/${id}/${domain}/${host}/${ruleName}`, data)
}
export const callAplyOvhDevmodeModify = (id: string, domain: string, host:string, data:any) => {
    return axios.put<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/devmode/${id}/${domain}/${host}`, data)
}
export const callAplyOvhBrotliModify = (id: string, domain: string, host:string, data:any) => {
    return axios.put<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/brotli/${id}/${domain}/${host}`, data)
}
export const callAplyOvhDomainModify = (id: string, domain: string, host:string, data:any) => {
    return axios.put<IBackendRes<IOvhZone>>(`/api/v1/ovh/zones/host/cdn/${id}/${domain}/${host}`, data)
}

export const callDeleteRecord = (id: string, zone: string, recordId: string) => {
    return axios.delete<IBackendRes<IOvhZone>>(`/api/v1/ovh/records/${id}/${zone}/${recordId}`);
}

export const callAddRecord = (id: string, record: IRecordDNS) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ovh/records/${id}`, { ...record })
}
export const callUpdateRecord = (id: string, recordId: string, record: IRecordDNS) => {
    return axios.patch<IBackendRes<IOvhZone>>(`/api/v1/ovh/records/${id}/${recordId}`, { ...record })
}
export const callFetchOvhSsl = (id: string, zone: string) => {
    return axios.get<IBackendRes<IOvhZone>>(`/api/v1/ssl/ssl/${id}/${zone}`)
}
export const callCreateOvhSsl = (id: string, data: any) => {
    return axios.post<IBackendRes<IOvhZone>>(`/api/v1/ssl/ssl/${id}`,{data})
}
export const callDelOvhSsl = (id: string, zone: string, recordId: string) => {
    return axios.delete<IBackendRes<IOvhZone>>(`/api/v1/ssl/ssl/${id}/${zone}/${recordId}`)
}