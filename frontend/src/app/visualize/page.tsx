"use client";

import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCities,
  useGetCityWeatherTags,
  useGetWeatherByTag,
} from "@/lib/react-query-hooks";
import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const { data: cities } = useCities();
  const { data: tags } = useGetCityWeatherTags(
    selectedCity ? parseInt(selectedCity) : 0
  );
  const { data: weatherData } = useGetWeatherByTag(
    selectedCity ? parseInt(selectedCity) : 0,
    selectedTag
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex gap-4">
        <Select onValueChange={setSelectedCity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities?.data?.map((city) => (
              <SelectItem key={city.id} value={city.id.toString()}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>

          <SelectContent>
            {tags?.data.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <ChartContainer
          config={{
            temperature: {
              label: "Temperature",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weatherData?.data
                ?.filter((day) => {
                  const date = new Date(day.createdAt);
                  const now = new Date();
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(now.getDate() - 7);
                  return date >= sevenDaysAgo && date <= now;
                })
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )}
            >
              <XAxis
                dataKey="createdAt"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-temperature)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  );
}
