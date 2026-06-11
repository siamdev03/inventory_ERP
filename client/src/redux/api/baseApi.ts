import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const baseApi =
  createApi({
    reducerPath: "baseApi",

    baseQuery: fetchBaseQuery({
      baseUrl:
        "http://localhost:8000/api/v1",

      prepareHeaders: (
        headers
      ) => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (token) {
          headers.set(
            "Authorization",
            `Bearer ${token}`
          );
        }

        return headers;
      },
    }),

    tagTypes: [
      "Dashboard",
      "Product",
      "Category",
      "Warehouse",
      "Supplier",
      "Purchase",
      "Sale",
      "Customer",
      "Analytics",
    ],

    endpoints: () => ({}),
  });