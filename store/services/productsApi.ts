import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Raw API response type based on Postman data
interface RawProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  variants: { size: string; color: string; stock: number }[];
  ratings: number;
  images: string[];
  category: string;
  tags: string[];
  reviews: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  rating: number;
  variants: { size: string; color: string; stock: number }[];
  isSale?: boolean;
  isNew?: boolean;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://6852e9e20594059b23cf9776.mockapi.io/products/v1/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      transformResponse: (response: RawProduct[]) =>
        response.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.images[0] || "/placeholder.jpg",
          price: item.price,
          discountPrice: item.discount_price,
          rating: item.ratings,
          variants: item.variants,
          isSale: !!item.discount_price,
          isNew: item.tags.includes("new"),
        })),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      transformResponse: (item: RawProduct) => ({
        id: item.id,
        title: item.title,
        image: item.images[0] || "/placeholder.jpg",
        price: item.price,
        discountPrice: item.discount_price,
        rating: item.ratings,
        variants: item.variants,
        isSale: !!item.discount_price,
        isNew: item.tags.includes("new"),
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;