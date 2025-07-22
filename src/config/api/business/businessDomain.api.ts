import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { IBusinessDomain } from "@/types/model/domainModel/businessDomain.d";

export const callFetchBusinessDomain = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBusinessDomain>>>(`/api/v1/business-domain?${query}`);
}