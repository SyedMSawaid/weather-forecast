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
import Link from "next/link";

export default function CityDetails() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useCityById(Number(id));
  const { mutateAsync } = useCreateCityWeather(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Data</div>;
  if (error) return <div>Error loading city details</div>;

  const fetchNewWeather = async () => {
    await toast.promise(Promise.all([mutateAsync()]), {
      loading: "Updating weather data...",
      success: "Weather data updated",
      error: "Error updating weather data",
    });
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {data?.data.name} Weather
          </h1>
          <h2 className="text-2xl font-semibold">
            {Math.round(data.data.weatherDatapoints[0].temperature)}°C
          </h2>
          <p className="text-lg">
            {weatherConditions[data.data.weatherDatapoints[0].weatherCode]}
          </p>
        </div>

        <div className="mb-4 text-right">
          <div className="flex gap-x-2">
            <Button onClick={fetchNewWeather}>Refetch New Weather</Button>
            <Link href={`/cities/${id}/edit`}>
              <Button>Edit</Button>
            </Link>
          </div>
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
                    <TableCell>{Math.round(day.temperature)}</TableCell>
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
