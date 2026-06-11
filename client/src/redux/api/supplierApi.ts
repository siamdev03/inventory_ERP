import { baseApi } from "./baseApi";

export const supplierApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getSuppliers:
        builder.query({
          query: () =>
            "/suppliers",

          providesTags: [
            "Supplier",
          ],
        }),

      createSupplier:
        builder.mutation({
          query: (data) => ({
            url: "/suppliers",
            method: "POST",
            body: data,
          }),

          invalidatesTags: [
            "Supplier",
          ],
        }),

      updateSupplier:
        builder.mutation({
          query: ({
            id,
            data,
          }) => ({
            url: `/suppliers/${id}`,
            method: "PATCH",
            body: data,
          }),

          invalidatesTags: [
            "Supplier",
          ],
        }),

      deleteSupplier:
        builder.mutation({
          query: (id) => ({
            url: `/suppliers/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "Supplier",
          ],
        }),
    }),
  });

export const {
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;