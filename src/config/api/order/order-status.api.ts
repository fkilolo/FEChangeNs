import { IBackendRes } from "@/types/model/base/base.d";
import { IOrderStatus } from "@/types/model/orderStatusModel/orderStatus.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';

export const callCreateOrderStatus = (orderStatus: IOrderStatus) => {
    return axios.post<IBackendRes<IOrderStatus>>('/api/v1/order-status', { ...orderStatus })
}

export const callUpdateOrderStatus = (orderStatus: IOrderStatus, id: string) => {
    return axios.patch<IBackendRes<IOrderStatus>>(`/api/v1/order-status/${id}`, { ...orderStatus })
}

export const callDeleteOrderStatus = (id: string) => {
    return axios.delete<IBackendRes<IOrderStatus>>(`/api/v1/order-status/${id}`);
}

export const callFetchOrderStatus = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IOrderStatus>>>(`/api/v1/order-status?${query}`);
}

export const callFetchOrderStatusById = (id: string) => {
    return axios.get<IBackendRes<IOrderStatus>>(`/api/v1/order-status/${id}`);
}

export const callFetchAllOrderStatus = () => {
    return axios.get<IBackendRes<IOrderStatus[]>>(`/api/v1/order-status/getAllOrderStatus`);
}