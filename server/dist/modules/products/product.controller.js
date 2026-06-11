"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Product Created Successfully",
        data: result,
    });
});
const getProducts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.getProducts(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Products Retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
});
const getSingleProduct = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await product_service_1.ProductServices.getSingleProduct(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Retrieved Successfully",
        data: result,
    });
});
const updateProduct = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await product_service_1.ProductServices.updateProduct(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Updated Successfully",
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await product_service_1.ProductServices.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Product Deleted Successfully",
        data: result,
    });
});
const getLowStockProducts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.getLowStockProducts();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Low Stock Products Retrieved Successfully",
        data: result,
    });
});
exports.ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
};
