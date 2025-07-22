import { IBackendRes } from "@/types/model/base/base.d";
import { ICart } from "@/types/model/cart/cart.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { ICartCreateUpdate } from "@/types/model/cart/cartCreateUpdate.d";

export const callCreateCart = (cart: ICartCreateUpdate) => {
    return axios.post<IBackendRes<ICartCreateUpdate>>('/api/v1/carts', { ...cart })
}

export const callUpdateCart = (cart: ICartCreateUpdate, id: string) => {
    return axios.patch<IBackendRes<ICartCreateUpdate>>(`/api/v1/carts/${id}`, { ...cart })
}

export const callDeleteCart = (id: string) => {
    return axios.delete<IBackendRes<ICartCreateUpdate>>(`/api/v1/carts/${id}`);
}

export const callFetchCart = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ICart>>>(`/api/v1/carts?${query}`);
}

export const callFetchCartById = (id: string) => {
    return axios.get<IBackendRes<ICart>>(`/api/v1/carts/${id}`);
}

export const callFetchCartByUserId = () => {
    return axios.get<IBackendRes<ICart>>(`/api/v1/carts/getCartByUserId`);
}

export const callDeleteDomainInCart = (id: string) => {
    return axios.delete<IBackendRes<ICartCreateUpdate>>(`/api/v1/carts/deleteDomainInCart/${id}`);
}