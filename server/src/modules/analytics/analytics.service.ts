import { Purchase } from "../purchases/purchase.model";
import { Sale } from "../sales/sale.model";

const getAnalyticsData = async () => {
  const purchaseResult =
    await Purchase.aggregate([
      {
        $group: {
          _id: null,
          totalPurchaseAmount: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

  const saleResult =
    await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSalesAmount: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

  const totalPurchaseAmount =
    purchaseResult[0]
      ?.totalPurchaseAmount || 0;

  const totalSalesAmount =
    saleResult[0]
      ?.totalSalesAmount || 0;

  const grossProfit =
    totalSalesAmount -
    totalPurchaseAmount;

  const totalPurchases =
    await Purchase.countDocuments();

  const totalSales =
    await Sale.countDocuments();

  return {
    totalPurchaseAmount,
    totalSalesAmount,
    grossProfit,
    totalPurchases,
    totalSales,
  };
};

export const AnalyticsServices = {
  getAnalyticsData,
};