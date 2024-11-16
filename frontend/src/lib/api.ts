import { CityCreatePayload, CityType, CityUpdatePayload } from "@/types/city";
import { ApiResponse } from "@/types/response";
import apiClient from "./axios";

export const fetchCities = async (): Promise<ApiResponse<CityType[]>> => {
  const response = await apiClient.get("/cities/");
  return response.data;
};

export const fetchCityById = async (
  cityId: number
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.get(`/cities/${cityId}`);
  return response;
};

export const createCity = async (
  createPayload: CityCreatePayload
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.post(`/cities`, createPayload);
  return response;
};

export const updateCity = async (
  cityId: number,
  updatePayload: CityUpdatePayload
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.put(`/cities/${cityId}`, updatePayload);
  return response;
};

export const removeCity = async (
  cityId: number
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.delete(`/cities/${cityId}`);
  return response;
};
