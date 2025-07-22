import { IBackendRes } from "@/types/model/base/base.d";
import { IOrderLog } from "@/types/model/orderModel/orderLog.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import axios from 'config/axios-customize';

export const callCreateOrderLog = (orderLog: IOrderLog) => {
    return axios.post<IBackendRes<IOrderLog>>('/api/v1/order-logs', { ...orderLog })
}

export const callFetchOrderLog = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IOrderLog>>>(`/api/v1/order-logs?${query}`);
}

export const callFetchOrderLogById = (id: string) => {
    return axios.get<IBackendRes<IOrderLog>>(`/api/v1/order-logs/${id}`);
}

export const callFetchOrderLogByCode = (code: string) => {
    return axios.get<IBackendRes<IOrderLog[]>>(`/api/v1/order-logs/getOrderLogByCode/${code}`);
}