import { baseApi } from "./baseApi";

export const saleApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getSales: builder.query({
        query: () => "/sales",

        providesTags: ["Sale"],
      }),

      createSale:
        builder.mutation({
          query: (data) => ({
            url: "/sales",
            method: "POST",
            body: data,
          }),

          invalidatesTags: [
            "Sale",
            "Product",
            "Dashboard",
          ],
        }),
    }),
  });

export const {
  useGetSalesQuery,
  useCreateSaleMutation,
} = saleApi;