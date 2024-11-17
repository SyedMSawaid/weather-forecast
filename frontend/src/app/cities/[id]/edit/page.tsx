"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCityById, useUpdateCity } from "@/lib/react-query-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  latitude: z.coerce
    .number()
    .refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
      message: "Latitude must be a number between -90 and 90.",
    }),
  longitude: z.coerce
    .number()
    .refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
      message: "Longitude must be a number between -180 and 180.",
    }),
});

export default function EditCity() {
  const { id } = useParams();
  const { data: city } = useCityById(Number(id));
  const {
    mutateAsync: updateCity,
    isError,
    isPending,
    error,
  } = useUpdateCity(Number(id));
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: city?.data.id,
      name: city?.data.name,
      latitude: city?.data.latitude,
      longitude: city?.data.longitude,
    },
  });

  useEffect(() => {
    const data = city?.data;
    form.reset(data);
  }, [city?.data, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateCity(values);
    toast.success("City updated successfully.");
    router.push("/cities");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Edit City</CardTitle>
        <CardDescription>
          Update the details of {city?.data.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the city you want to update.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter latitude"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter longitude"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push(`/cities/${id}`)}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update City"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
