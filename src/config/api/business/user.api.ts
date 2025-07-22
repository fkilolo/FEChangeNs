import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { IUser } from "@/types/model/userModel/user.d";
import axios from 'config/axios-customize';

export const callCreateUser = (user: IUser) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/users', { ...user })
}

export const callUpdateUser = (user: IUser, id: string) => {
    return axios.patch<IBackendRes<IUser>>(`/api/v1/users/${id}`, { ...user })
}

export const callDeleteUser = (id: string) => {
    return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
}

export const callFetchUser = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/users?${query}`);
}

export const callFetchAllUser = () => {
    return axios.get<IBackendRes<IUser[]>>(`/api/v1/users/getAllUser`);
}