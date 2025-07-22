import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { ITelegram } from "@/types/model/telegramModel/telegram.d";
import axios from 'config/axios-customize';

export const callCreateTelegram = (telegram: ITelegram) => {
    return axios.post<IBackendRes<ITelegram>>('/api/v1/telegrams', { ...telegram })
}

export const callUpdateTelegram = (telegrams: ITelegram, id: string) => {
    return axios.patch<IBackendRes<ITelegram>>(`/api/v1/telegrams/${id}`, { ...telegrams })
}

export const callDeleteTelegram = (id: string) => {
    return axios.delete<IBackendRes<ITelegram>>(`/api/v1/telegrams/${id}`);
}

export const callFetchTelegram = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ITelegram>>>(`/api/v1/telegrams?${query}`);
}

export const callFetchTelegramById = (id: string) => {
    return axios.get<IBackendRes<ITelegram>>(`/api/v1/telegrams/${id}`);
}