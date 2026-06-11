"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const sale_service_1 = require("./sale.service");
const createSale = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sale_service_1.SaleServices.createSale(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Sale Created Successfully",
        data: result,
    });
});
const getSales = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sale_service_1.SaleServices.getSales();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Sales Retrieved Successfully",
        data: result,
    });
});
const getSingleSale = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await sale_service_1.SaleServices.getSingleSale(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Sale Retrieved Successfully",
        data: result,
    });
});
exports.SaleControllers = {
    createSale,
    getSales,
    getSingleSale,
};
