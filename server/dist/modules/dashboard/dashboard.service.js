"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServices = void 0;
const product_model_1 = require("../products/product.model");
const category_model_1 = require("../categories/category.model");
const warehouse_model_1 = require("../warehouse/warehouse.model");
const supplier_model_1 = require("../suppliers/supplier.model");
const customer_model_1 = require("../customers/customer.model");
const purchase_model_1 = require("../purchases/purchase.model");
const sale_model_1 = require("../sales/sale.model");
const getDashboardData = async () => {
    const totalProducts = await product_model_1.Product.countDocuments();
    const totalCategories = await category_model_1.Category.countDocuments();
    const totalWarehouses = await warehouse_model_1.Warehouse.countDocuments();
    const totalSuppliers = await supplier_model_1.Supplier.countDocuments();
    const totalCustomers = await customer_model_1.Customer.countDocuments();
    const totalPurchases = await purchase_model_1.Purchase.countDocuments();
    const totalSales = await sale_model_1.Sale.countDocuments();
    const stockResult = await product_model_1.Product.aggregate([
        {
            $group: {
                _id: null,
                totalStock: {
                    $sum: "$stock",
                },
            },
        },
    ]);
    const totalStock = stockResult[0]?.totalStock || 0;
    return {
        totalProducts,
        totalCategories,
        totalWarehouses,
        totalSuppliers,
        totalCustomers,
        totalPurchases,
        totalSales,
        totalStock,
    };
};
exports.DashboardServices = {
    getDashboardData,
};
