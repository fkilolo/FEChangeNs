import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IPullZone } from "@/types/model/bunnyModel/bunnyPullZone.d";
import { ILinode } from "@/types/model/linodeModel/linode.d";
import { ILinodeDNSRecord, ILinodeDNSRecordsResponse, ILinodeDomain, ILinodeDomainResponse, IRecordDNS } from "@/types/model/linodeModel/linodeDomain.d";
import axios from 'config/axios-customize';

const API_BASE_URL = "/api/v1/linode";

export const callCreateLinode = (Linode: ILinode) => {
    return axios.post<IBackendRes<ILinode>>('API_BASE_URL', { ...Linode })
}

export const callUpdateLinode = (Linode: ILinode, id: string) => {
    return axios.patch<IBackendRes<ILinode>>(`${API_BASE_URL}/${id}`, { ...Linode })
}

export const callDeleteLinode = (id: string) => {
    return axios.delete<IBackendRes<ILinode>>(`${API_BASE_URL}/${id}`);
}

export const callFetchLinode = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ILinode>>>(`${API_BASE_URL}?${query}`);
}

export const callFetchLinodeById = (id: string) => {
    return axios.get<IBackendRes<ILinode>>(`${API_BASE_URL}/${id}`);
}

export const callFetchAllLinodeByUser = () => {
    return axios.get<IBackendRes<ILinode[]>>(`${API_BASE_URL}/my-linode`);
}


export const callFetchLinodeZone = (id: string, zoneId: string) => {
    return axios.get<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/zones/${id}/${zoneId}`);
}

export const callDeleteLinodeZone = (id: string, zoneId: string) => {
    return axios.delete<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/zones/${id}/${zoneId}`);
}

export const callAddLinodeZone = (id: string, zone: ILinodeDomain) => {
    return axios.post<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/zones/${id}`, { ...zone })
}

export const callUpdateLinodeZone = (id: string, zoneId: string, zone: ILinodeDomain) => {
    return axios.patch<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/zones/${id}/${zoneId}`, { ...zone })
}

export const callDeleteRecord = (id: string, zoneId: string, recordId: string) => {
    return axios.delete<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/records/${id}/${zoneId}/${recordId}`);
}

export const callAddRecord = (id: string, zoneId: string, record: IRecordDNS) => {
    return axios.post<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/records/${id}/${zoneId}`, { ...record })
}

export const callUpdateRecord = (id: string, zoneId: string, recordId: string, record: IRecordDNS) => {
    return axios.patch<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/records/${id}/${zoneId}/${recordId}`, { ...record })
}

export const callChangeCDNAcceleration = (id: string, zoneId: string, recordId: string, Accelerated: boolean,) => {
    return axios.post<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/cdn-acceleration/${id}/${zoneId}/${recordId}`, { Accelerated })
}

export const callSetForceSSL = (id: string, hostname: string, force: boolean) => {
    return axios.post<IBackendRes<ILinodeDomain>>(`${API_BASE_URL}/force-ssl/${id}`, { force, hostname })
}

export const callGetAllPullZone = (id: string) => {
    return axios.get<IBackendRes<IPullZone[]>>(`${API_BASE_URL}/pull-zone/${id}`);
}

export const callGetDetailPullZone = (id: string, pullZoneId: string) => {
    return axios.get<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}`);
}

export const callDeletePullZone = (id: string, pullZoneId: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}`);
}

export const callUpdatePullZone = (id: string, pullZoneId: string, pullZone: IPullZone) => {
    return axios.patch<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}`, { ...pullZone });
}

export const callDeleteHostname = (id: string, pullZoneId: string, Hostname: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}/remove-hostname`, { data: { Hostname } });
}

export const callLoadFreeSSL = (id: string, Hostname: string, isDelete: boolean, pullZoneId: string) => {
    return axios.post<IBackendRes<IPullZone>>(`${API_BASE_URL}/load-free-ssl/${id}`, { Hostname, pullZoneId, isDelete });
}

export const callPurgeCache = (id: string, pullZoneId: string) => {
    return axios.post<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}/purge-cache`);
}

export const callUpdateBlockIP = (id: string, pullZoneId: string, ip: string, isDelete: boolean) => {
    return axios.post<IBackendRes<IPullZone>>(`${API_BASE_URL}/pull-zone/${id}/${pullZoneId}/block-ip`, { ip, isDelete });
}

export const callDeleteEdgeRule = (id: string, pullZoneId: string, ruleId: string) => {
    return axios.delete<IBackendRes<IPullZone>>(`${API_BASE_URL}/edge-rule/${id}/${pullZoneId}/${ruleId}`);
}

export const callAddOrUpdateEdgeRule = (id: string, pullZoneId: string, body: any) => {
    return axios.post<IBackendRes<IPullZone>>(`${API_BASE_URL}/edge-rule/${id}/${pullZoneId}`, { ...body });
}


export const callFetchAllDNSRecordsByDomainId = (id: string, domainId: number) => {
    return axios.get<IBackendRes<ILinodeDNSRecordsResponse>>(`${API_BASE_URL}/dns/${id}/${domainId}`);
};

export const callCreateDNSRecord = (id: string, domainId: number, data: ILinodeDNSRecord) => {
    return axios.post<IBackendRes<ILinodeDNSRecord>>(`${API_BASE_URL}/dns/${id}/${domainId}`, data);
};

export const callUpdateDNSRecord = (id: string, domainId: number, recordId: number, data: Partial<ILinodeDNSRecord>) => {
    return axios.put<IBackendRes<ILinodeDNSRecord>>(`${API_BASE_URL}/dns/${id}/${domainId}/${recordId}`, data);
};

export const callDeleteDNSRecord = (id: string, domainId: number, recordId: number) => {
    return axios.delete<IBackendRes<null>>(`${API_BASE_URL}/dns/${id}/${domainId}/${recordId}`);
};


export const callFetchAllDomainByLinodeId = (id: string, qs: string) => {
    return axios.get<IBackendRes<ILinodeDomainResponse>>(`${API_BASE_URL}/domains/${id}?${qs}`);
}


export const callFetchAllDomains = (id: string, qs: string) => {
    return axios.get(`${API_BASE_URL}/domains/${id}`, { params: { qs } });
};

export const callCreateDomain = (id: string, domainData: any) => {
    return axios.post(`${API_BASE_URL}/domains/${id}`, domainData);
};

export const callCloneDomain = (id: string, domainId: number, newDomainData: any) => {
    return axios.post(`${API_BASE_URL}/domains/${id}/clone/${domainId}`, newDomainData);
};

export const callUpdateDomain = (id: string, domainId: number, updateData: any) => {
    return axios.put(`${API_BASE_URL}/domains/${id}/${domainId}`, updateData);
};

export const callDeleteDomain = (id: string, domainId: number) => {
    return axios.delete(`${API_BASE_URL}/domains/${id}/${domainId}`);
};

export const callFetchSettingSSL = (id: string) => {
    return axios.get(`/api/v1/cert/ssl/${id}`);
};

export const callSettingSSL = ({ domainId, domain }: { domainId: number; domain: string }) => {
    return axios.post(`/api/v1/cert/ssl`, { domainId, domain });
};

export const callVerifySSL = (domainId: number) => {
    return axios.post(`/api/v1/cert/ssl/${domainId}/verify`);
};

export const callCancelSSL = (domainId: number) => {
    return axios.post(`/api/v1/cert/ssl/${domainId}/cancel`);
};

export const callAddDNSforSSL = (id: string, domainId: number, dnsRecordForSSL: ILinodeDNSRecord[]) => {
    return axios.post(`/api/v1/linode/dns/${id}/${domainId}/ssl`, dnsRecordForSSL);
};