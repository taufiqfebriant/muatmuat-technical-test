import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type ProductState = {
  products: Product[];
  add: (data: Pick<Product, "name" | "price" | "stock">) => void;
  find: (id: Product["id"]) => Product | undefined;
  update: (
    id: Product["id"],
    data: Pick<Product, "name" | "price" | "stock">
  ) => void;
  delete: (id: Product["id"]) => void;
};

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [
    {
      id: 1,
      name: "Product #1",
      price: 2000000,
      stock: 50,
    },
  ],
  add: (data) => {
    return set((state) => {
      let id = 1;
      const latestProduct = state.products[state.products.length - 1];
      if (latestProduct) {
        id = latestProduct.id + 1;
      }

      state.products.push({
        id,
        name: data.name,
        price: data.price,
        stock: data.stock,
      });

      return {
        products: state.products,
      };
    });
  },
  find: (id) => {
    const products = get().products;
    return products.find((product) => product.id === id);
  },
  update: (id, data) => {
    return set((state) => {
      return {
        products: state.products.map((product) => {
          if (product.id === id) {
            return {
              ...product,
              name: data.name,
              price: data.price,
              stock: data.stock,
            };
          }

          return product;
        }),
      };
    });
  },
  delete: (id) => {
    return set((state) => {
      return {
        products: state.products.filter((product) => product.id !== id),
      };
    });
  },
}));
