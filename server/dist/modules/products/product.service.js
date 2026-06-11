"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const auditLog_service_1 = require("../auditLogs/auditLog.service");
const createProduct = async (payload) => {
    const product = await product_model_1.Product.create(payload);
    await auditLog_service_1.AuditLogServices.createAuditLog("SYSTEM", "CREATE", "PRODUCT", `Product Created: ${product.name}`);
    return product;
};
const getProducts = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = query.searchTerm || "";
    const category = query.category;
    const filter = {};
    if (searchTerm) {
        filter.name = {
            $regex: searchTerm,
            $options: "i",
        };
    }
    if (category) {
        filter.category = category;
    }
    const total = await product_model_1.Product.countDocuments(filter);
    const products = await product_model_1.Product.find(filter)
        .populate("category")
        .skip(skip)
        .limit(limit)
        .sort({
        createdAt: -1,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: products,
    };
};
const getSingleProduct = async (id) => {
    const product = await product_model_1.Product.findById(id).populate("category");
    return product;
};
const updateProduct = async (id, payload) => {
    const product = await product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).populate("category");
    if (product) {
        await auditLog_service_1.AuditLogServices.createAuditLog("SYSTEM", "UPDATE", "PRODUCT", `Product Updated: ${product.name}`);
    }
    return product;
};
const deleteProduct = async (id) => {
    const product = await product_model_1.Product.findByIdAndDelete(id);
    if (product) {
        await auditLog_service_1.AuditLogServices.createAuditLog("SYSTEM", "DELETE", "PRODUCT", `Product Deleted: ${product.name}`);
    }
    return product;
};
const getLowStockProducts = async () => {
    const products = await product_model_1.Product.find({
        stock: {
            $lte: 5,
        },
    })
        .populate("category")
        .sort({
        stock: 1,
    });
    return products;
};
exports.ProductServices = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
};
