"use client";

import { useCityById, useCreateCityWeather } from "@/lib/react-query-hooks";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { weatherConditions } from "@/types/city-weather";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CityDetails() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useCityById(Number(id));
  const { mutateAsync } = useCreateCityWeather(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Data</div>;
  if (error) return <div>Error loading city details</div>;

  const fetchNewWeather = async () => {
    await mutateAsync();
    refetch();
    toast.success("Weather data updated");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="mb-8 text-3xl font-bold text-primary">
          {data?.data.name} Weather
        </h1>
        <div className="mb-4 text-right">
          <h2 className="text-2xl font-semibold">
            {Math.round(data.data.weatherDatapoints[0].temperature)}°C
          </h2>
          <p className="text-lg">
            {weatherConditions[data.data.weatherDatapoints[0].weatherCode]}
          </p>

          <Button onClick={fetchNewWeather}>Refetch New Weather</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Temperature History</CardTitle>
            <CardDescription>Past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
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
                  data={data.data.weatherDatapoints
                    .filter((day) => {
                      const date = new Date(day.createdAt);
                      const now = new Date();
                      const sevenDaysAgo = new Date();
                      sevenDaysAgo.setDate(now.getDate() - 7);
                      return date >= sevenDaysAgo && date <= now;
                    })
                    .slice(-7)}
                >
                  <XAxis
                    dataKey="createdAt"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weather Data</CardTitle>
            <CardDescription>Detailed information for all time</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Temperature (°C)</TableHead>
                  <TableHead>Weather</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.weatherDatapoints.map((day) => (
                  <TableRow key={day.id}>
                    <TableCell>
                      {new Date(day.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{day.temperature}</TableCell>
                    <TableCell>{weatherConditions[day.weatherCode]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
