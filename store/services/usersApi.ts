// store/services/usersApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  orders: { id: string; items: { productId: string; quantity: number }[]; total: number }[];
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  password: string;
  name: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://6852e9e20594059b23cf9776.mockapi.io/products/v1/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUpRequest>({
      query: (body) => ({
        url: "Users",
        method: "POST",
        body,
      }),
    }),
    login: builder.query<User, LoginRequest>({
      query: (body) => ({
        url: "Users",
        method: "GET",
        params: body,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginQuery } = usersApi;