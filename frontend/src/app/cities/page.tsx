"use client";

import { Input } from "@/components/ui/input";
import { useCities } from "@/lib/react-query-hooks";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Search,
  Sun,
  Sunrise,
} from "lucide-react";
import { useState } from "react";

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useCities();

  if (isLoading) return <div>Loading...</div>;

  const filteredCities = data?.data.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-6 w-6" />;
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-6 w-6" />;
      case "rainy":
        return <CloudRain className="h-6 w-6" />;
      case "drizzle":
        return <CloudDrizzle className="h-6 w-6" />;
      default:
        return <Sunrise className="h-6 w-6" />;
    }
  };

  const getBackgroundColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return "bg-yellow-100";
      case "cloudy":
      case "partly cloudy":
        return "bg-gray-100";
      case "rainy":
      case "drizzle":
        return "bg-blue-100";
      default:
        return "bg-green-100";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-800">
          Weather App
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
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCities?.map((city) => (
            <div
              key={city.name}
              className={`rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg ${getBackgroundColor(
                city.latitude.toString()
              )}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {city.name}
                </h2>
                {getWeatherIcon(city.latitude.toString())}
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {city.latitude.toString()}°C
              </p>
              <p className="mt-1 text-gray-600">{city.latitude.toString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
