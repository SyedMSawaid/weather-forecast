import { CityWeatherType } from "./city-weather";

export type CityType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  weatherDatapoints: CityWeatherType[];
  createdAt: Date;
  updatedAt: Date;
};

export type CityCreatePayload = {
  name?: string;
  latitude?: number;
  longitude?: number;
};

export type CityUpdatePayload = {
  name?: string;
  latitude?: number;
  longitude?: number;
};
