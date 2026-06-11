import { baseApi } from "./baseApi";

export const purchaseApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getPurchases:
        builder.query({
          query: () =>
            "/purchases",

          providesTags: [
            "Purchase",
          ],
        }),

      getPurchase:
        builder.query({
          query: (id) =>
            `/purchases/${id}`,
        }),

      createPurchase:
        builder.mutation({
          query: (data) => ({
            url: "/purchases",
            method: "POST",
            body: data,
          }),

          invalidatesTags: [
            "Purchase",
          ],
        }),
    }),
  });

export const {
  useGetPurchasesQuery,
  useGetPurchaseQuery,
  useCreatePurchaseMutation,
} = purchaseApi;