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

export default function Edit() {
  const router = useRouter();
  const product = useProductStore((state) =>
    state.find(Number(router.query.id))
  );

  const updateProduct = useProductStore((state) => state.update);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name,
      price: String(product?.price),
      stock: String(product?.stock),
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    updateProduct(Number(router.query.id), {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
    });

    router.push("/");
  }

  if (!product) {
    return <p>No data found</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Edit Product</h1>
      </div>

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
              Update
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
