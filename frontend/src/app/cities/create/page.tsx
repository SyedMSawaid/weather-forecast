"use client";

import { useCreateCity } from "@/lib/react-query-hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateCity() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const router = useRouter();

  const { mutateAsync: createCity } = useCreateCity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createCity({
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    console.log({ response });

    if (response) {
      router.push(`/cities/${response.data.id}`);
      toast.success("City created successfully");
    }
  };

  return (
    <div>
      <h1>Create City</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <button type="submit">Create City</button>
      </form>
    </div>
  );
}
