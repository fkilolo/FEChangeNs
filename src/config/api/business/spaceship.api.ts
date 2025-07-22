import axios from "@/config/axios-customize";

export const callFetchSpaceshipList = (query: string) => {
  return axios.get(`/api/v1/spaceship/?${query}`);
};

export const callCreateSpaceship = (data: any) => {
  return axios.post("/api/v1/spaceship/", data);
};

export const callDeleteSpaceship = (id: string) => {
  return axios.delete(`/api/v1/spaceship/${id}`);
};

export const callUpdateSpaceship = (id: string, data: any) => {
  return axios.patch(`/api/v1/spaceship/${id}`, data);
};

export const callFetchSpaceshipDomains = (connectId: string, params: { take?: number; skip?: number; orderBy?: string; search?: string}) => {
  const { take = 50, skip = 0, orderBy = "name", search = "" } = params;
  return axios.get(`/api/v1/spaceship/domains/${connectId}?take=${take}&skip=${skip}&orderBy=${orderBy}&search=${search}`);
};

export const callUpdateSpaceshipNameservers = (payload: {
  conect_id: string;
  provider: string;
  domain: string[];
  hosts: string[];
}) => {
  return axios.post("/api/v1/spaceship/domains/update_nameservers", payload);
}; 