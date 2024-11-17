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

export const useCities = () => {
  return useQuery({
    queryKey: ["city"],
    queryFn: () => fetchCities(),
  });
};

export const useCityById = (cityId: number) => {
  return useQuery({
    queryKey: ["city", cityId.toString()],
    queryFn: () => fetchCityById(cityId),
  });
};

export const useCreateCity = () => {
  return useMutation({
    mutationKey: ["city"],
    mutationFn: (createPayload: CityCreatePayload) => createCity(createPayload),
  });
};

export const useRemoveCity = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId],
    mutationFn: () => removeCity(cityId),
  });
};

export const useUpdateCity = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId],
    mutationFn: (updatePayload: CityUpdatePayload) =>
      updateCity(cityId, updatePayload),
  });
};

export const useCreateCityWeather = (cityId: number) => {
  return useMutation({
    mutationKey: ["city", cityId, "weather"],
    mutationFn: () => createCityWeather(cityId),
  });
};

export const useCreateAllCityWeather = () => {
  return useMutation({
    mutationKey: ["cities", "weather"],
    mutationFn: () => createAllCityWeather(),
  });
};

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

export const useGetCityWeatherTags = (cityId: number) => {
  return useQuery({
    queryKey: ["cityWeather", cityId, "tags"],
    queryFn: () => {
      return getCityWeatherTags(cityId);
    },
  });
};

export const useGetWeatherByTag = (cityId: number, tag: string) => {
  return useQuery({
    queryKey: ["cityWeather", cityId, "tags", tag],
    queryFn: () => getWeatherByTag(cityId, tag),
  });
};
