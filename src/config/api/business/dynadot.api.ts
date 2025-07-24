import axios from "@/config/axios-customize";

export const callFetchDynadotList = (query: string) => {
  return axios.get(`/api/v1/dynadot/?${query}`);
};

export const callCreateDynadot = (data: any) => {
  return axios.post("/api/v1/dynadot/", data);
};

export const callDeleteDynadot = (id: string) => {
  return axios.delete(`/api/v1/dynadot/${id}`);
};

export const callUpdateDynadot = (id: string, data: any) => {
  return axios.patch(`/api/v1/dynadot/${id}`, data);
};

export const callFetchDynadotDomains = (connectId: string, params: { take?: number; skip?: number; orderBy?: string; search?: string }) => {
  const { take = 50, skip = 0, orderBy = "name", search = "" } = params;
  return axios.get(`/api/v1/dynadot/domains/${connectId}?take=${take}&skip=${skip}&orderBy=${orderBy}${search ? `&search=${encodeURIComponent(search)}` : ''}`);
};

export const callUpdateDynadotNameservers = (payload: {
  conect_id: string;
  domain: string[];
  hosts: string[];
}) => {
  return axios.post("/api/v1/dynadot/domains/update_nameservers", payload);
};

export const callFetchDynadotDomainDetail = (connectId: string, domain: string) => {
  return axios.get(`/api/v1/dynadot/domains/${connectId}/detail/${domain}`);
}; 