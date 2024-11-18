import { CityCreatePayload, CityType, CityUpdatePayload } from "@/types/city";
import { ApiResponse } from "@/types/response";
import apiClient from "./axios";
import { CityWeatherType } from "@/types/city-weather";

// Fetch all cities
export const fetchCities = async (): Promise<ApiResponse<CityType[]>> => {
  const response = await apiClient.get("/cities/");
  return response.data;
};

// Fetch a city by ID
export const fetchCityById = async (
  cityId: number
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.get(`/cities/${cityId}`);
  return response.data;
};

// Create a city
export const createCity = async (
  createPayload: CityCreatePayload
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.post(`/cities`, createPayload);
  return response.data;
};

// Update a city
export const updateCity = async (
  cityId: number,
  updatePayload: CityUpdatePayload
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.put(`/cities/${cityId}`, updatePayload);
  return response.data;
};

// Delete a city
export const removeCity = async (
  cityId: number
): Promise<ApiResponse<CityType>> => {
  const response = await apiClient.delete(`/cities/${cityId}`);
  return response.data;
};

// Triggers fetching weather datapoint for a single city
export const createCityWeather = async (cityId: number) => {
  const response = await apiClient.post(`/cities/${cityId}/weather`);
  return response;
};

// Trigger fetching weather datapoint for all cities
export const createAllCityWeather = async () => {
  const response = await apiClient.post("/cities/weather");
  return response;
};

// Add a tag to a city weather datapoint
export const addCityWeatherTag = async (
  cityWeatherId: number,
  tag: string
): Promise<ApiResponse<CityWeatherType>> => {
  const response = await apiClient.put(`/cities/weather/${cityWeatherId}/tag`, {
    tag,
  });
  return response.data;
};

// Fetch all tags for a city
export const getCityWeatherTags = async (
  cityId: number
): Promise<ApiResponse<string[]>> => {
  const response = await apiClient.get(`/cities/${cityId}/weather/tags`);
  return response.data;
};

// Fetch all weather datapoints for a city by tag
export const getWeatherByTag = async (
  cityId: number,
  tag: string
): Promise<ApiResponse<CityWeatherType[]>> => {
  const response = await apiClient.get(`/cities/${cityId}/weather`, {
    params: { tag },
  });
  return response.data;
};
