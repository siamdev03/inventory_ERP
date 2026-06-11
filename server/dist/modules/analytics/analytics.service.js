"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsServices = void 0;
const purchase_model_1 = require("../purchases/purchase.model");
const sale_model_1 = require("../sales/sale.model");
const getAnalyticsData = async () => {
    const purchaseResult = await purchase_model_1.Purchase.aggregate([
        {
            $group: {
                _id: null,
                totalPurchaseAmount: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);
    const saleResult = await sale_model_1.Sale.aggregate([
        {
            $group: {
                _id: null,
                totalSalesAmount: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);
    const totalPurchaseAmount = purchaseResult[0]
        ?.totalPurchaseAmount || 0;
    const totalSalesAmount = saleResult[0]
        ?.totalSalesAmount || 0;
    const grossProfit = totalSalesAmount -
        totalPurchaseAmount;
    const totalPurchases = await purchase_model_1.Purchase.countDocuments();
    const totalSales = await sale_model_1.Sale.countDocuments();
    return {
        totalPurchaseAmount,
        totalSalesAmount,
        grossProfit,
        totalPurchases,
        totalSales,
    };
};
exports.AnalyticsServices = {
    getAnalyticsData,
};
