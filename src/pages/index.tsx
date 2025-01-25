import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/stores/product";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.delete);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = products
    .filter((product) => product.name.includes(search))
    .sort((a, b) => {
      if (sort === "lowest-price") {
        return a.price - b.price;
      }

      if (sort === "highest-price") {
        return b.price - a.price;
      }

      if (sort === "lowest-stock") {
        return a.stock - b.stock;
      }

      if (sort === "highest-stock") {
        return b.stock - a.stock;
      }

      return a.id - b.id;
    });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <Link
          href="/add"
          className="flex h-10 w-32 items-center justify-center rounded bg-black text-white"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-20">
        <div className="flex items-center gap-x-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name..."
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSort("default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("lowest-price")}>
                Lowest Price
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("highest-price")}>
                Highest Price
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("lowest-stock")}>
                Lowest Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort("highest-stock")}>
                Highest Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredProducts.length ? (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <div className="h-48 w-full rounded bg-[#eef0f2] flex items-center justify-center">
                  <div className="h-32 w-32 relative">
                    <Image
                      src="https://prd.place/200"
                      alt={product.name}
                      layout="fill"
                    />
                  </div>
                </div>

                <div className="flex items-start mt-2">
                  <div className="flex-1">
                    <p className="text-sm">{product.name}</p>
                    <p className="font-semibold">
                      Rp
                      {Intl.NumberFormat("id-ID", {
                        style: "decimal",
                      }).format(product.price)}
                    </p>
                    <p className="text-xs mt-1 text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex-shrink-0 mt-1">
                      <EllipsisVertical size={18} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href={`${product.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProduct(product.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No data found</p>
        )}
      </div>
    </>
  );
}
