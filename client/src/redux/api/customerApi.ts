import { baseApi } from "./baseApi";

export const customerApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getCustomers:
        builder.query({
          query: () =>
            "/customers",

          providesTags: [
            "Customer",
          ],
        }),

      createCustomer:
        builder.mutation({
          query: (data) => ({
            url: "/customers",

            method: "POST",

            body: data,
          }),

          invalidatesTags:
            ["Customer"],
        }),

      updateCustomer:
        builder.mutation({
          query: ({
            id,
            data,
          }) => ({
            url: `/customers/${id}`,

            method: "PATCH",

            body: data,
          }),

          invalidatesTags:
            ["Customer"],
        }),

      deleteCustomer:
        builder.mutation({
          query: (id) => ({
            url: `/customers/${id}`,

            method: "DELETE",
          }),

          invalidatesTags:
            ["Customer"],
        }),
    }),
  });

export const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;