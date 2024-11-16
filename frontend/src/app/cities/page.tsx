"use client";

import { useCities } from "@/lib/react-query-hooks";

export default function Cities() {
  const { data, isLoading } = useCities();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cities</h1>
      <p>Here you can see the list of cities</p>
      <ul>{JSON.stringify(data)}</ul>
    </div>
  );
}
