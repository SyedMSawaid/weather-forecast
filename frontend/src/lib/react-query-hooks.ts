import { CityCreatePayload, CityUpdatePayload } from "@/types/city";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCity,
  fetchCities,
  fetchCityById,
  removeCity,
  updateCity,
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
