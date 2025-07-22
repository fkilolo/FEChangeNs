import { IBackendRes } from "@/types/model/base/base.d";
import { IOrder } from "@/types/model/orderModel/order.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';
import { IOrderCreateUpdate } from "@/types/model/orderModel/orderCreateUpdate.d";
import { IBuyDomain } from "@/types/model/orderModel/buyDomain.d";

export const callCreateOrder = (order: IOrderCreateUpdate) => {
    return axios.post<IBackendRes<IOrderCreateUpdate>>('/api/v1/orders', { ...order })
}

export const callUpdateOrder = (order: IOrder, id: string) => {
    return axios.patch<IBackendRes<IOrderCreateUpdate>>(`/api/v1/orders/${id}`, { ...order })
}

export const callDeleteOrder = (id: string) => {
    return axios.delete<IBackendRes<IOrder>>(`/api/v1/orders/${id}`);
}

export const callFetchOrder = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IOrder>>>(`/api/v1/orders?${query}`);
}

export const callFetchOrderById = (id: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/${id}`);
}

export const buyDomain = (id: string) => {
    return axios.get<IBackendRes<IBuyDomain>>(`/api/v1/orders/buyDomain/${id}`);
}

export const cancelOrder = (id: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/cancelOrder/${id}`);
}

export const approveOrder = (id: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/approveOrder/${id}`);
}

export const asyncOrderBusiness = (id: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/asyncOrderBusiness/${id}`);
}

export const callFetchOrderByCode = (code: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/getOrderDetailByCode/${code}`);
}

export const callFetchOrderByCodePublic = (code: string) => {
    return axios.get<IBackendRes<IOrder>>(`/api/v1/orders/getOrderDetailByCode-public/${code}`);
}

export const deleteDomainByOrder = (id: string, query: string) => {
    return axios.delete<IBackendRes<IOrder>>(`/api/v1/orders/deleteDomainByOrder/${id}?${query}`);
}

export const callExportOrder = (query: string) => {
    return axios.get(`/api/v1/orders/exportExcelOrder?${query}`);
}