"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleServices = void 0;
const sale_model_1 = require("./sale.model");
const product_model_1 = require("../products/product.model");
const createSale = async (payload) => {
    const product = await product_model_1.Product.findById(payload.product);
    if (!product) {
        throw new Error("Product Not Found");
    }
    if (product.stock <
        payload.quantity) {
        throw new Error("Insufficient Stock");
    }
    const sale = await sale_model_1.Sale.create(payload);
    await product_model_1.Product.findByIdAndUpdate(payload.product, {
        $inc: {
            stock: -payload.quantity,
        },
    });
    return sale;
};
const getSales = async () => {
    const sales = await sale_model_1.Sale.find()
        .populate("customer")
        .populate("product")
        .populate("warehouse");
    return sales;
};
const getSingleSale = async (id) => {
    const sale = await sale_model_1.Sale.findById(id)
        .populate("customer")
        .populate("product")
        .populate("warehouse");
    return sale;
};
exports.SaleServices = {
    createSale,
    getSales,
    getSingleSale,
};
