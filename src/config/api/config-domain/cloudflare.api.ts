import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { ICloudflare } from "@/types/model/cloudflareModel/connect-cloudflare/cloudflare.d";
import { ICreateZoneCloudflare } from "@/types/model/cloudflareModel/domain-cloudflare/createZonecloudflare.d";
import { IDomainCloudflare } from "@/types/model/cloudflareModel/domain-cloudflare/domainCloudflare.d";
import { IOrganizations } from "@/types/model/cloudflareModel/connect-cloudflare/organizations.d";
import axios from 'config/axios-customize';
import { IDNSDomainCloudflare } from "@/types/model/cloudflareModel/dns-domain-cloudflare/dnsDomainModel";
import { IUpdateDNSDomainCloudflare } from "@/types/model/cloudflareModel/dns-domain-cloudflare/updateDNSDomainModel";
import { IDeleteDNSDomainCloudflare } from "@/types/model/cloudflareModel/dns-domain-cloudflare/deleteDNSDomainModel";
import { ICheckNameServerCloudflare } from "@/types/model/cloudflareModel/dns-domain-cloudflare/checkNameServerCloudflare";
import { IUpdateSSLCloudflare } from "@/types/model/cloudflareModel/domain-cloudflare/updateSSLCloudflare.d";
import { ISSLDomainCloudflare } from "@/types/model/cloudflareModel/domain-cloudflare/sslCloudflare.d";
import { IPurgeEverythingCloudflare } from "@/types/model/cloudflareModel/cache-cloudflare/purgeEverythingModel";
import { IPurgeEverything } from "@/types/model/cloudflareModel/cache-cloudflare/purgeEverything";
import { ICacheLevelCloudflare } from "@/types/model/cloudflareModel/cache-cloudflare/cacheLevelModel";
import { ICacheLevel } from "@/types/model/cloudflareModel/cache-cloudflare/cacheLevel";
import { ICacheTTL } from "@/types/model/cloudflareModel/cache-cloudflare/cacheTTL";
import { ICacheTTLCloudflare } from "@/types/model/cloudflareModel/cache-cloudflare/cacheTTLModel";
import { IAlwayOnline } from "@/types/model/cloudflareModel/cache-cloudflare/alwayOnline";
import { IAlwayOnlineCloudflare } from "@/types/model/cloudflareModel/cache-cloudflare/alwayOnlineModel";
import { IDevModeCloudflare } from "@/types/model/cloudflareModel/cache-cloudflare/devModeModel";
import { IDevMode } from "@/types/model/cloudflareModel/cache-cloudflare/devMode";
import { IPageRuleCloudflare } from "@/types/model/cloudflareModel/page-rule-cloudflare/pageRule.d";
import { ICreatePageRuleCloudflare } from "@/types/model/cloudflareModel/page-rule-cloudflare/CreatePageRuleModel";
import { IDeletePageRuleCloudflare } from "@/types/model/cloudflareModel/page-rule-cloudflare/deletePageRuleModel";
import { IUpdatePageRuleCloudflare } from "@/types/model/cloudflareModel/page-rule-cloudflare/updatePageRuleModel";
import { ICustomRuleCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/customRule.d";
import { IUpdateCustomRuleCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/updateCustomRuleModel";
import { IResWafRuleCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/wafRule.d";
import { ICreateCustomRuleCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/createCustomRuleModel";
import { IRateLimitCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/rate-limit/rateLimit.d";
import { IUpdateRateLimitCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/rate-limit/updateRateLimitModel";
import { ICreateRateLimitCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/rate-limit/createRateLimitModel";
import { IDeleteRateLimitCloudflareModel } from "@/types/model/cloudflareModel/waf-cloudflare/rate-limit/deleteRateLimitModel";
import { IDeleteCustomRuleCloudflareModel } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/deleteCustomRuleModel";
import { IDeleteCustomRuleCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/custom-rule/deleteCustomRule.d";
import { IDeleteRateLimitCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/rate-limit/deleteRateLimit.d";
import {  IBotModel } from "@/types/model/cloudflareModel/bot-cloudflare/bot.d";
import { IAIBotModelCloudflare } from "@/types/model/cloudflareModel/bot-cloudflare/AIBotModel";
import { IBotModelCloudflare } from "@/types/model/cloudflareModel/bot-cloudflare/botModel";
import { IDeleteDdosCloudflareModel } from "@/types/model/cloudflareModel/waf-cloudflare/ddos/deleteDdosModel";
import { IDdosCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/ddos/ddos.d";
import { ICreateDdosCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/ddos/createDdosModel";
import { IUpdateDdosCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/ddos/updateDdosModel";
import { IRuleSetCloudflare } from "@/types/model/cloudflareModel/waf-cloudflare/rule-set/ruleSet.d";
import { IEdgeCertificatesCloudflare } from "@/types/model/cloudflareModel/domain-cloudflare/UpdateEdgeCertificatesCloudflare.d";
import { IUpdateEdgeCertificatesCloudflareModel } from "@/types/model/cloudflareModel/domain-cloudflare/edgeCertificatesCloudflare.d copy";
import { IClientCertificates } from "@/types/model/cloudflareModel/ssl-domain-cloudflare/clientCertificates";
import { IDeleteClientCertificates } from "@/types/model/cloudflareModel/ssl-domain-cloudflare/deleteClientCertificates";
import { ICreateClientCertificates } from "@/types/model/cloudflareModel/ssl-domain-cloudflare/createClientCertificates";

export const callCreateCloudflare = (cloudflare: ICloudflare) => {
    return axios.post<IBackendRes<ICloudflare>>('/api/v1/cloudflares', { ...cloudflare })
}

export const callUpdateCloudflare = (cloudflare: ICloudflare, id: string) => {
    return axios.patch<IBackendRes<ICloudflare>>(`/api/v1/cloudflares/${id}`, { ...cloudflare })
}

export const callDeleteCloudflare = (id: string) => {
    return axios.delete<IBackendRes<ICloudflare>>(`/api/v1/cloudflares/${id}`);
}

export const callFetchCloudflare = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ICloudflare>>>(`/api/v1/cloudflares?${query}`);
}

export const callFetchOrganizations = (query: string) => {
    return axios.get<IBackendRes<IOrganizations[]>>(`/api/v1/cloudflares/getOrganizations?${query}`);
}

export const callFetchCloudflareById = (id: string) => {
    return axios.get<IBackendRes<ICloudflare>>(`/api/v1/cloudflares/${id}`);
}

//website cloudflare
export const callFetchDomainCloudflare = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IDomainCloudflare>>>(`/api/v1/cloudflares/getDomainCloudflare?${query}`);
}

//create zone cloudflare
export const callCreateZoneCloudflare = (zoneCloudflare: ICreateZoneCloudflare) => {
    return axios.post<IBackendRes<IDomainCloudflare>>('/api/v1/cloudflares/createZoneCloudflare', { ...zoneCloudflare })
}

//get dns by zone id
export const callFetchDNSDomainCloudflare = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IDNSDomainCloudflare>>>(`/api/v1/cloudflares/getDNSDomainCloudflare?${query}`);
}

//create dns in zone
export const callCreateDNSCloudflare = (dnsDomain: IUpdateDNSDomainCloudflare) => {
    return axios.post<IBackendRes<IDNSDomainCloudflare>>(`/api/v1/cloudflares/createDNSCloudflare`, { ...dnsDomain })
}

//update dns in zone
export const callUpdateDNSCloudflare = (dnsDomain: IUpdateDNSDomainCloudflare) => {
    return axios.patch<IBackendRes<IDNSDomainCloudflare>>(`/api/v1/cloudflares/updateDNSCloudflare`, { ...dnsDomain })
}

//delete dns zone
export const callDeleteDNSCloudflare = (deleteDNSDomain: IDeleteDNSDomainCloudflare) => {
    return axios.post<IBackendRes<ICloudflare>>('/api/v1/cloudflares/deleteDNSCloudflare', { ...deleteDNSDomain })
}

//check name server cloudflare
export const callCheckNameServerCloudflare = (checkNameServerCloudflare: ICheckNameServerCloudflare) => {
    return axios.put<IBackendRes<ICloudflare>>('/api/v1/cloudflares/activationCheck', { ...checkNameServerCloudflare })
}

export const callDeleteWebsiteCloudflare = (id?: string, token?: string) => {
    return axios.delete<IBackendRes<ICloudflare>>(`/api/v1/cloudflares/deleteWebsiteCloudflare/${id}?token=${token}`);
}

//get setting ssl
export const callFetchSSlSetting = (query: string) => {
    return axios.get<IBackendRes<ISSLDomainCloudflare>>(`/api/v1/cloudflares/getSSlSetting/${query}`);
}

//get edge certificates 
export const callFetchEdgeCertificates = (query: string) => {
    return axios.get<IBackendRes<IEdgeCertificatesCloudflare>>(`/api/v1/cloudflares/getEdgeCertificates/${query}`);
}

//update edge certificates 
export const callUpdateEdgeCertificates = (updateEdgeCertificates: IUpdateEdgeCertificatesCloudflareModel) => {
    return axios.patch<IBackendRes<IBotModel>>(`/api/v1/cloudflares/updateEdgeCertificates`, { ...updateEdgeCertificates })
}

//update setting ssl
export const callUpdateSSLSetting = (updateSSLCloudflare: IUpdateSSLCloudflare) => {
    return axios.put<IBackendRes<ISSLDomainCloudflare>>('/api/v1/cloudflares/updateSSLSetting', { ...updateSSLCloudflare })
}

//purge everything
export const callPurgeEverythingCloudflare = (purgeEverything: IPurgeEverythingCloudflare) => {
    return axios.post<IBackendRes<IPurgeEverything>>('/api/v1/cloudflares/purgeCache', { ...purgeEverything })
}

//get cache level
export const callFetchCacheLevel = (query: string) => {
    return axios.get<IBackendRes<ICacheLevel>>(`/api/v1/cloudflares/getCacheLevel/${query}`);
}

//update cache level
export const callCacheLevelCloudflare = (cacheLevel: ICacheLevelCloudflare) => {
    return axios.post<IBackendRes<ICacheLevel>>('/api/v1/cloudflares/updateCacheLevel', { ...cacheLevel })
}

//get cache ttl
export const callFetchCacheTTL = (query: string) => {
    return axios.get<IBackendRes<ICacheTTL>>(`/api/v1/cloudflares/getCacheTTL/${query}`);
}

//update cache ttl
export const callCacheTTLCloudflare = (cacheTTL: ICacheTTLCloudflare) => {
    return axios.post<IBackendRes<ICacheTTL>>('/api/v1/cloudflares/updateCacheTTL', { ...cacheTTL })
}

//get alway online
export const callFetchAlwayOnline = (query: string) => {
    return axios.get<IBackendRes<IAlwayOnline>>(`/api/v1/cloudflares/getAlwaysOnline/${query}`);
}

//update alway online
export const callAlwayOnlineCloudflare = (alwayOnline: IAlwayOnlineCloudflare) => {
    return axios.post<IBackendRes<IAlwayOnline>>('/api/v1/cloudflares/updateAlwaysOnline', { ...alwayOnline })
}

//get dev mode
export const callFetchDevMode = (query: string) => {
    return axios.get<IBackendRes<IDevMode>>(`/api/v1/cloudflares/getDevMode/${query}`);
}

//update dev mode
export const callDevModeCloudflare = (devMode: IDevModeCloudflare) => {
    return axios.post<IBackendRes<IDevMode>>('/api/v1/cloudflares/updateDevMode', { ...devMode })
}

//get page rule
export const callFetchPageRule = (query: string) => {
    return axios.get<IBackendRes<IPageRuleCloudflare[]>>(`/api/v1/cloudflares/getPageRule/${query}`);
}

//create page rule
export const callCreatePageRuleCloudflare = (updatePageRule: ICreatePageRuleCloudflare) => {
    return axios.post<IBackendRes<IPageRuleCloudflare>>('/api/v1/cloudflares/createPageRule', { ...updatePageRule })
}

//update page rule
export const callUpdatePageRuleCloudflare = (updatePageRule: IUpdatePageRuleCloudflare) => {
    return axios.post<IBackendRes<IPageRuleCloudflare>>('/api/v1/cloudflares/updatePageRule', { ...updatePageRule })
}

//delete page rule
export const callDeletePageRuleCloudflare = (deletePageRule: IDeletePageRuleCloudflare) => {
    return axios.post<IBackendRes<IPageRuleCloudflare>>('/api/v1/cloudflares/deletePageRule', { ...deletePageRule })
}

//get custom rule
export const callFetchCustomRule = (query: string) => {
    return axios.get<IBackendRes<ICustomRuleCloudflare[]>>(`/api/v1/cloudflares/getCustomRule${query}`);
}

//create custom rule
export const callCreateCustomRuleCloudflare = (createCustomRule: ICreateCustomRuleCloudflare) => {
    return axios.post<IBackendRes<IResWafRuleCloudflare>>('/api/v1/cloudflares/createWafRule', { ...createCustomRule })
}

//update custom rule
export const callUpdateCustomRuleCloudflare = (updateCustomRule: IUpdateCustomRuleCloudflare) => {
    return axios.post<IBackendRes<IResWafRuleCloudflare>>('/api/v1/cloudflares/updateWafRule', { ...updateCustomRule })
}

//delete custom rule
export const callDeleteCustomRuleCloudflare = (deleteCustomRule: IDeleteCustomRuleCloudflareModel) => {
    return axios.post<IBackendRes<IDeleteCustomRuleCloudflare>>('/api/v1/cloudflares/deleteWafRule', { ...deleteCustomRule })
}

export const callFetchCountry = () => {
    return axios.get<any[]>(`https://restcountries.com/v3.1/all`);
}

//get rate limit
export const callFetchRateLimit = (query: string) => {
    return axios.get<IBackendRes<IRateLimitCloudflare[]>>(`/api/v1/cloudflares/getRateLimit${query}`);
}

//update rate limit
export const callUpdateRateLimitCloudflare = (updateRateLimit: IUpdateRateLimitCloudflare) => {
    return axios.post<IBackendRes<IResWafRuleCloudflare>>('/api/v1/cloudflares/updateRateLimit', { ...updateRateLimit })
}

//create rate limit
export const callCreateRateLimitCloudflare = (createRateLimit: ICreateRateLimitCloudflare) => {
    return axios.post<IBackendRes<IResWafRuleCloudflare>>('/api/v1/cloudflares/createRateLimit', { ...createRateLimit })
}

//delete rate limit
export const callDeleteRateLimitCloudflare = (deleteRateLimit: IDeleteRateLimitCloudflareModel) => {
    return axios.post<IBackendRes<IDeleteRateLimitCloudflare>>('/api/v1/cloudflares/deleteRateLimit', { ...deleteRateLimit })
}

//get bot
export const callFetchBot = (query: string) => {
    return axios.get<IBackendRes<IBotModel>>(`/api/v1/cloudflares/getBotManagement${query}`);
}

//update bot
export const callUpdateBotCloudflare = (bot: IBotModelCloudflare) => {
    return axios.patch<IBackendRes<IBotModel>>(`/api/v1/cloudflares/updateBotManagement`, { ...bot })
}

//update ai bot
export const callUpdateAIBotCloudflare = (AIBot: IAIBotModelCloudflare) => {
    return axios.patch<IBackendRes<IBotModel>>(`/api/v1/cloudflares/updateAiBotManagement`, { ...AIBot })
}

//get ddos
export const callFetchDdos = (query: string) => {
    return axios.get<IBackendRes<IDdosCloudflare[]>>(`/api/v1/cloudflares/getDdos${query}`);
}

//update ddos
export const callCreateDdosCloudflare = (createDdos: ICreateDdosCloudflare) => {
    return axios.post<IBackendRes<IDdosCloudflare[]>>('/api/v1/cloudflares/createDdos', { ...createDdos })
}

//update ddos
export const callUpdateDdosCloudflare = (updateDdos: IUpdateDdosCloudflare) => {
    return axios.post<IBackendRes<IDdosCloudflare[]>>('/api/v1/cloudflares/updateDdos', { ...updateDdos })
}

//delete ddos
export const callDeleteDdosCloudflare = (deleteDdos: IDeleteDdosCloudflareModel) => {
    return axios.post<IBackendRes<IDdosCloudflare[]>>('/api/v1/cloudflares/deleteDdos', { ...deleteDdos })
}

//get rule set
export const callFetchRuleSet = (query: string) => {
    return axios.get<IBackendRes<IRuleSetCloudflare[]>>(`/api/v1/cloudflares/getRuleSets${query}`);
}

//get client certificates 
export const callFetchClientCertificates = (query: string) => {
    return axios.get<IBackendRes<IClientCertificates[]>>(`/api/v1/cloudflares/getOriginCertificates/${query}`);
}

//create client certificates 
export const callCreateClientCertificates = (createClientCertificates: ICreateClientCertificates) => {
    return axios.post<IBackendRes<IClientCertificates>>(`/api/v1/cloudflares/createOriginCertificates`, createClientCertificates);
}

//delete client certificates 
export const callDeleteClientCertificates = (deleteClientCertificates: IDeleteClientCertificates) => {
    return axios.post<IBackendRes<IClientCertificates>>(`/api/v1/cloudflares/deleteOriginCertificates`, deleteClientCertificates);
}