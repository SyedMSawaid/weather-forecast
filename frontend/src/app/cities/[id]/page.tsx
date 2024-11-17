"use client";

import { useCityById } from "@/lib/react-query-hooks";
import { useParams } from "next/navigation";

export default function CityDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useCityById(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading city details</div>;

  return (
    <div>
      <h1>{data?.data.name}</h1>
      <p>{data?.data.latitude}</p>
      <p>{data?.data.longitude}</p>
    </div>
  );
}
