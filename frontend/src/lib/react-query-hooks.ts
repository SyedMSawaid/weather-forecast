import { CityCreatePayload, CityUpdatePayload } from "@/types/city";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAllCityWeather,
  createCity,
  createCityWeather,
  fetchCities,
  fetchCityById,
  removeCity,
  updateCity,
  addCityWeatherTag,
  getCityWeatherTags,
  getWeatherByTag,
} from "./api";

// Hook to fetch all cities
export const useCities = () => {
  return useQuery({
    queryKey: ["city"],
    queryFn: () => fetchCities(),
  });
};

// Hook to fetch a city by its ID
export const useCityById = (cityId: number) => {
  return useQuery({
    queryKey: ["city", cityId.toString()],
    queryFn: () => fetchCityById(cityId),
  });
};

// Hook to create a city
export const useCreateCity = () => {
  return useMutation({
    mutationKey: ["city"],
    mutationFn: (createPayload: CityCreatePayload) => createCity(createPayload),
  });
};

// Hook to remove a city
export const useRemoveCity = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId],
    mutationFn: () => removeCity(cityId),
  });
};

// Hook to update a city
export const useUpdateCity = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId],
    mutationFn: (updatePayload: CityUpdatePayload) =>
      updateCity(cityId, updatePayload),
  });
};

// Hook to trigger fetching weather datapoint for a single city
export const useCreateCityWeather = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId, "weather"],
    mutationFn: () => createCityWeather(cityId),
  });
};

// Hook to trigger fetching weather datapoint for all cities
export const useCreateAllCityWeather = () => {
  return useMutation({
    mutationKey: ["cities", "weather"],
    mutationFn: () => createAllCityWeather(),
  });
};

// Hook to add a tag to a city weather datapoint
export const useAddCityWeatherTag = (cityId: number, tagId: number | null) => {
  return useMutation({
    mutationKey: ["cityWeather", cityId, "tag", tagId],
    mutationFn: ({
      cityWeatherId,
      tag,
    }: {
      cityWeatherId: number;
      tag: string;
    }) => addCityWeatherTag(cityWeatherId, tag),
  });
};

// Hook to fetch all tags for a city weather datapoint
export const useGetCityWeatherTags = (cityId: number) => {
  return useQuery({
    queryKey: ["cityWeather", cityId, "tags"],
    queryFn: () => {
      return getCityWeatherTags(cityId);
    },
  });
};

// Hook to fetch all weather datapoints for a city by tag
export const useGetWeatherByTag = (cityId: number, tag: string) => {
  return useQuery({
    queryKey: ["cityWeather", cityId, "tags", tag],
    queryFn: () => getWeatherByTag(cityId, tag),
  });
};
