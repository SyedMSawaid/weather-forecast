"use client";

import {
  useCityById,
  useCreateCityWeather,
  useAddCityWeatherTag,
} from "@/lib/react-query-hooks";
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
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { WeatherText } from "@/components/weather-display";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Check } from "lucide-react";

export default function CityDetails() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useCityById(Number(id));
  const { mutateAsync } = useCreateCityWeather(Number(id));
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const { mutateAsync: addTag } = useAddCityWeatherTag(Number(id), editingId);

  const handleEditClick = (id: number, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (editingId !== null) {
      await toast.promise(addTag({ cityWeatherId: editingId, tag: editText }), {
        loading: "Updating tag...",
        success: "Tag updated",
        error: "Error updating tag",
      });
    }
    setEditingId(null);
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No Data</div>;
  if (error) return <div>Error loading city details</div>;

  const fetchNewWeather = async () => {
    await toast.promise(mutateAsync(), {
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
            {WeatherText(data.data.weatherDatapoints[0].weatherCode)}
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
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Date</TableHead>
                  <TableHead className="w-1/4">Temperature (°C)</TableHead>
                  <TableHead className="w-1/4">Weather</TableHead>
                  <TableHead className="w-1/4">Tag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.weatherDatapoints.map((day) => (
                  <TableRow key={day.id}>
                    <TableCell className="w-1/4">
                      {new Date(day.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="w-1/4">
                      {Math.round(day.temperature)}
                    </TableCell>
                    <TableCell className="w-1/4">
                      {WeatherText(day.weatherCode)}
                    </TableCell>
                    <TableCell className="w-1/4">
                      {editingId === day.id ? (
                        <div className="flex items-center">
                          <Input
                            value={editText}
                            onChange={handleEditChange}
                            onBlur={handleEditSubmit}
                            autoFocus
                          />
                          <Check
                            className="ml-2 cursor-pointer text-white bg-green-800 rounded-full p-1"
                            onClick={handleEditSubmit}
                          />
                        </div>
                      ) : day.tag ? (
                        <span onClick={() => handleEditClick(day.id, day.tag)}>
                          {day.tag}
                        </span>
                      ) : (
                        <Plus
                          className="border rounded-full text-gray-600 text-sm"
                          onClick={() => handleEditClick(day.id, "")}
                        />
                      )}
                    </TableCell>
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
