"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseServices = void 0;
const purchase_model_1 = require("./purchase.model");
const product_model_1 = require("../products/product.model");
const createPurchase = async (payload) => {
    const purchase = await purchase_model_1.Purchase.create(payload);
    // Auto Stock Increase
    await product_model_1.Product.findByIdAndUpdate(payload.product, {
        $inc: {
            stock: payload.quantity,
        },
    }, {
        new: true,
    });
    return purchase;
};
const getPurchases = async () => {
    const purchases = await purchase_model_1.Purchase.find()
        .populate("supplier")
        .populate("product")
        .populate("warehouse");
    return purchases;
};
const getSinglePurchase = async (id) => {
    const purchase = await purchase_model_1.Purchase.findById(id)
        .populate("supplier")
        .populate("product")
        .populate("warehouse");
    return purchase;
};
exports.PurchaseServices = {
    createPurchase,
    getPurchases,
    getSinglePurchase,
};
