"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const purchase_service_1 = require("./purchase.service");
const createPurchase = (0, catchAsync_1.default)(async (req, res) => {
    const result = await purchase_service_1.PurchaseServices.createPurchase(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Purchase Created Successfully",
        data: result,
    });
});
const getPurchases = (0, catchAsync_1.default)(async (req, res) => {
    const result = await purchase_service_1.PurchaseServices.getPurchases();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Purchases Retrieved Successfully",
        data: result,
    });
});
const getSinglePurchase = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await purchase_service_1.PurchaseServices.getSinglePurchase(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Purchase Retrieved Successfully",
        data: result,
    });
});
exports.PurchaseControllers = {
    createPurchase,
    getPurchases,
    getSinglePurchase,
};
