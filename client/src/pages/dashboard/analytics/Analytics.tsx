import AnalyticsSummaryCards from "@/components/analytics/AnalyticsSummaryCards";
import RevenueAnalyticsTable from "@/components/analytics/RevenueAnalyticsTable";
import TopProductsTable from "@/components/analytics/TopProductsTable";

import { useGetSalesQuery } from "@/redux/api/saleApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useGetCustomersQuery } from "@/redux/api/customerApi";

const Analytics = () => {
  const {
    data: salesData,
  } = useGetSalesQuery(
    undefined
  );

  const {
    data: productData,
  } =
    useGetProductsQuery({
      page: 1,
      limit: 1000,
    });

  const {
    data: customerData,
  } =
    useGetCustomersQuery(
      undefined
    );

  const sales =
    salesData?.data || [];

  const products =
    productData?.data || [];

  const customers =
    customerData?.data || [];

  const totalRevenue =
    sales.reduce(
      (
        total: number,
        sale: any
      ) =>
        total +
        sale.totalAmount,
      0
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Analytics Center
        </h1>

        <p className="text-slate-500 mt-2">
          ERP Business
          Intelligence
          Dashboard
        </p>
      </div>

      <AnalyticsSummaryCards
        revenue={
          totalRevenue
        }
        sales={
          sales.length
        }
        customers={
          customers.length
        }
        products={
          products.length
        }
      />

      <div className="grid xl:grid-cols-2 gap-6">
        <RevenueAnalyticsTable
          sales={sales}
        />

        <TopProductsTable
          products={
            products
          }
        />
      </div>
    </div>
  );
};

export default Analytics;