export type CityWeatherType = {
  id: number;
  cityId: number;
  temperature: number;
  weatherCode: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const weatherConditions: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
};
