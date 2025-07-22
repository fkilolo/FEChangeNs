import { IBackendRes } from "@/types/model/base/base.d";
import { ISearchDomain } from "@/types/model/searchDomainModel/searchDomain";
import axios from 'config/axios-customize';

export const fetchSearchDomain = (domain: string) => {
    return axios.get<IBackendRes<ISearchDomain[]>>(`/api/v1/public-domain-service/search-domain/${domain}`);
}