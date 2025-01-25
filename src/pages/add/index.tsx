import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/stores/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  stock: z.string().min(1, { message: "Stock is required" }),
});

export default function Add() {
  const router = useRouter();
  const addProduct = useProductStore((state) => state.add);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    addProduct({
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
    });

    router.push("/");
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Add Product</h1>
      </div>

      {/* <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" {...form.register("name")} />
        <span>{form.formState.errors.name?.message}</span>
        <input type="text" {...form.register("price")} />
        <span>{form.formState.errors.price?.message}</span>
        <input type="text" {...form.register("stock")} />
        <span>{form.formState.errors.stock?.message}</span>

        <button type="submit">Add</button>
      </form> */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="mt-8" size="lg">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
