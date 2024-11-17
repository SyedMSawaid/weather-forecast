"use client";

import { useCityById, useUpdateCity } from "@/lib/react-query-hooks";
import { CityUpdatePayload } from "@/types/city";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditCity() {
  const router = useRouter();
  const { id } = useParams();
  const { data: city, isLoading } = useCityById(Number(id));
  const updateCityMutation = useUpdateCity(Number(id));

  const [formData, setFormData] = useState<CityUpdatePayload>({
    name: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.data.name,
        latitude: city.data.latitude,
        longitude: city.data.longitude,
      });
    }
  }, [city]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCityMutation.mutateAsync(formData);
    toast.success("City updated successfully!");
    router.push(`/cities/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit City</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Latitude</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update City</button>
      </form>
    </div>
  );
}
