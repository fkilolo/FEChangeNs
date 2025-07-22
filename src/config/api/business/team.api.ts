import { IBackendRes } from "@/types/model/base/base.d";
import { IModelPaginate } from "@/types/model/base/paginate.d";
import { ITeam } from "@/types/model/teamModel/team.d";
import axios from 'config/axios-customize';

export const callCreateTeam = (team: ITeam) => {
    return axios.post<IBackendRes<ITeam>>('/api/v1/teams', { ...team })
}

export const callUpdateTeam = (team: ITeam, id: string) => {
    return axios.patch<IBackendRes<ITeam>>(`/api/v1/teams/${id}`, { ...team })
}

export const synchronizeTeamByName = (name: string) => {
    return axios.get<IBackendRes<ITeam>>(`/api/v1/teams/getSynchronizeTeamByName?name=${name}`)
}

export const callDeleteTeam = (id: string) => {
    return axios.delete<IBackendRes<ITeam>>(`/api/v1/teams/${id}`);
}

export const callFetchTeam = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ITeam>>>(`/api/v1/teams?${query}`);
}

export const callFetchTeamPublic = (query: string) => {
    return axios.get<IBackendRes<IModelPaginate<ITeam>>>(`/api/v1/teams/getTeamPaginate?${query}`);
}

export const callFetchAllTeam = () => {
    return axios.get<IBackendRes<ITeam[]>>(`/api/v1/teams/getAllTeam`);
}

export const callFetchTeamById = (id: string) => {
    return axios.get<IBackendRes<ITeam>>(`/api/v1/teams/${id}`);
}