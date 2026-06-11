import { baseApi } from "./baseApi";

export const warehouseApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getWarehouses:
        builder.query({
          query: (params) => ({
            url: "/warehouses",
            params,
          }),

          providesTags: [
            "Warehouse",
          ],
        }),

      createWarehouse:
        builder.mutation({
          query: (data) => ({
            url: "/warehouses",
            method: "POST",
            body: data,
          }),

          invalidatesTags: [
            "Warehouse",
          ],
        }),

      updateWarehouse:
        builder.mutation({
          query: ({
            id,
            data,
          }) => ({
            url: `/warehouses/${id}`,
            method: "PATCH",
            body: data,
          }),

          invalidatesTags: [
            "Warehouse",
          ],
        }),

      deleteWarehouse:
        builder.mutation({
          query: (id) => ({
            url: `/warehouses/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "Warehouse",
          ],
        }),
    }),
  });

export const {
  useGetWarehousesQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;