import { IAccount, IGetAccount } from '@/types/model/accountModel/account.d';
import { IBackendRes } from '@/types/model/base/base.d';
import { IUser } from '@/types/model/userModel/user.d';
import axios from 'config/axios-customize';

export const callRegister = (userName: string, email: string, password: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', { userName, email, password})
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}