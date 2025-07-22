import { IBackendRes } from "@/types/model/base/base.d";
import { IBrand } from "@/types/model/brandModel/brand.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';

export const callCreateBrand = (brand: IBrand) => {
    return axios.post<IBackendRes<IBrand>>('/api/v1/brands', { ...brand })
}

export const callUpdateBrand = (brand: IBrand, id: string) => {
    return axios.patch<IBackendRes<IBrand>>(`/api/v1/brands/${id}`, { ...brand })
}

export const callDeleteBrand = (id: string) => {
    return axios.delete<IBackendRes<IBrand>>(`/api/v1/brands/${id}`);
}

export const callFetchBrand = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBrand>>>(`/api/v1/brands?${query}`);
}

export const callFetchBrandPublic = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IBrand>>>(`/api/v1/brands/getBrandPaginate?${query}`);
}

export const callFetchAllBrand = () => {
    return axios.get<IBackendRes<IBrand[]>>(`/api/v1/brands/getAllBrand`);
}

export const callFetchBrandById = (id: string) => {
    return axios.get<IBackendRes<IBrand>>(`/api/v1/brands/${id}`);
}

export const synchronizeBrandByName = (name: string) => {
    return axios.get<IBackendRes<IBrand>>(`/api/v1/brands/getSynchronizeBrandByName?name=${name}`)
}