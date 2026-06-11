import { baseApi } from "./baseApi";

export const productApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Get Products
      getProducts: builder.query({
        query: (params) => ({
          url: "/products",
          params,
        }),

        providesTags: ["Product"],
      }),

      // Create Product
      createProduct:
        builder.mutation({
          query: (data) => ({
            url: "/products",
            method: "POST",
            body: data,
          }),

          invalidatesTags: [
            "Product",
          ],
        }),

      // Update Product
      updateProduct:
        builder.mutation({
          query: ({
            id,
            data,
          }: {
            id: string;
            data: any;
          }) => ({
            url: `/products/${id}`,
            method: "PATCH",
            body: data,
          }),

          invalidatesTags: [
            "Product",
          ],
        }),

      // Delete Product
      deleteProduct:
        builder.mutation({
          query: (
            id: string
          ) => ({
            url: `/products/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "Product",
          ],
        }),
    }),
  });

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;