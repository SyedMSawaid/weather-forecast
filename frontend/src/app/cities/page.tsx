"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCities, useCreateAllCityWeather } from "@/lib/react-query-hooks";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Search,
  Sun,
  Sunrise,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const weatherConditions: { [key: number]: string } = {
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

const getWeatherIcon = (condition: number) => {
  switch (condition) {
    case 0:
    case 1:
      return <Sun className="h-6 w-6" />;
    case 2:
    case 3:
      return <Cloud className="h-6 w-6" />;
    case 45:
    case 48:
      return <CloudDrizzle className="h-6 w-6" />;
    case 51:
    case 53:
    case 55:
      return <CloudDrizzle className="h-6 w-6" />;
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return <CloudRain className="h-6 w-6" />;
    default:
      return <Sunrise className="h-6 w-6" />;
  }
};

const getBackgroundColor = (condition: number) => {
  switch (condition) {
    case 0:
    case 1:
      return "bg-yellow-100";
    case 2:
    case 3:
      return "bg-gray-100";
    case 45:
    case 48:
      return "bg-gray-200";
    case 51:
    case 53:
    case 55:
      return "bg-blue-100";
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return "bg-blue-200";
    default:
      return "bg-green-100";
  }
};

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = useCities();
  const { mutateAsync } = useCreateAllCityWeather();

  if (isLoading) return <div>Loading...</div>;

  const filteredCities = data?.data.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchLatestWeather = async () => {
    await mutateAsync();
    refetch();
    toast.success("New weather data fetched successfully!");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-800">
          Baywa.re
        </h1>
        <div className="mb-6 flex items-center rounded-lg bg-white p-2 shadow-md">
          <Search className="mr-2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-none bg-transparent text-lg focus:outline-none focus:ring-0"
          />
          <Button className="ml-2" onClick={fetchLatestWeather}>
            Fetch Latest Weather
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCities?.map((city) => (
            <div
              key={city.name}
              className={`rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg ${getBackgroundColor(
                city.weatherDatapoints[0].weatherCode
              )}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {city.name}
                </h2>
                {getWeatherIcon(city.weatherDatapoints[0].weatherCode)}
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {Math.round(city.weatherDatapoints[0].temperature)}°C
              </p>
              <p className="mt-1 text-gray-600">
                {weatherConditions[city.weatherDatapoints[0].weatherCode]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
