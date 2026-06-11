// src/redux/api/reportApi.ts

import { baseApi } from "./baseApi";

export const reportApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getSalesReport:
        builder.query({
          query: () => "/sales",
        }),

      getPurchaseReport:
        builder.query({
          query: () => "/purchases",
        }),

      getInventoryReport:
        builder.query({
          query: () => "/products",
        }),

      getCustomerReport:
        builder.query({
          query: () => "/customers",
        }),
    }),
  });

export const {
  useGetSalesReportQuery,
  useGetPurchaseReportQuery,
  useGetInventoryReportQuery,
  useGetCustomerReportQuery,
} = reportApi;