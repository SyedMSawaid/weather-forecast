import { redirect } from "next/navigation";

// Redirect to the cities page
export default async function Home() {
  redirect("/cities");
}
