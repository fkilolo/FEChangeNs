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