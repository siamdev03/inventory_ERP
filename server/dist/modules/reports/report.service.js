"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportServices = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const purchase_model_1 = require("../purchases/purchase.model");
const sale_model_1 = require("../sales/sale.model");
const product_model_1 = require("../products/product.model");
const getPurchaseReport = async (startDate, endDate) => {
    const filter = {};
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    const purchases = await purchase_model_1.Purchase.find(filter)
        .populate("supplier")
        .populate("product")
        .populate("warehouse")
        .sort({ createdAt: -1 });
    return purchases;
};
const getSalesReport = async (startDate, endDate) => {
    const filter = {};
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    const sales = await sale_model_1.Sale.find(filter)
        .populate("product")
        .populate("warehouse")
        .sort({ createdAt: -1 });
    return sales;
};
const getStockReport = async () => {
    const products = await product_model_1.Product.find()
        .populate("category")
        .sort({ stock: 1 });
    return products;
};
const exportSalesExcel = async () => {
    const sales = await sale_model_1.Sale.find()
        .populate("product")
        .populate("warehouse");
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet("Sales Report");
    worksheet.columns = [
        {
            header: "Product",
            key: "product",
            width: 30,
        },
        {
            header: "Warehouse",
            key: "warehouse",
            width: 30,
        },
        {
            header: "Quantity",
            key: "quantity",
            width: 15,
        },
        {
            header: "Selling Price",
            key: "sellingPrice",
            width: 20,
        },
        {
            header: "Total Amount",
            key: "totalAmount",
            width: 20,
        },
        {
            header: "Status",
            key: "status",
            width: 15,
        },
        {
            header: "Date",
            key: "date",
            width: 25,
        },
    ];
    sales.forEach((sale) => {
        worksheet.addRow({
            product: sale.product?.name ||
                "N/A",
            warehouse: sale.warehouse?.name ||
                "N/A",
            quantity: sale.quantity,
            sellingPrice: sale.sellingPrice,
            totalAmount: sale.totalAmount,
            status: sale.status,
            date: sale.createdAt,
        });
    });
    return workbook;
};
exports.ReportServices = {
    getPurchaseReport,
    getSalesReport,
    getStockReport,
    exportSalesExcel,
};
