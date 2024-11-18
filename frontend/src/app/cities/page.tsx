"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WeatherIcon, WeatherText } from "@/components/weather-display";
import { useCities, useCreateAllCityWeather } from "@/lib/react-query-hooks";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { data, isLoading, refetch } = useCities();
  const { mutateAsync } = useCreateAllCityWeather();

  if (isLoading) return <div>Loading...</div>;

  // Filter cities based on search term
  const filteredCities = data?.data.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trigger fetching new weather data for all cities
  const fetchLatestWeather = async () => {
    await toast.promise(mutateAsync(), {
      loading: "Fetching new weather data...",
      success: "New weather data fetched successfully!",
      error: "Failed to fetch new weather data.",
    });
    refetch();
  };

  return (
    <div className="min-h-screen  p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-blue-800">
          Baywa.re
        </h1>
        <Card className="mb-6 flex items-center rounded-lg bg-white p-2 shadow-md">
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
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCities?.map((city) => (
            <Card
              key={city.name}
              className="rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
              onClick={() => router.push(`/cities/${city.id}`)}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {city.name}
                </h2>
                {WeatherIcon(city.weatherDatapoints[0].weatherCode)}
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {Math.round(city.weatherDatapoints[0].temperature)}°C
              </p>
              <p className="mt-1 text-gray-600">
                {WeatherText(city.weatherDatapoints[0].weatherCode)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
