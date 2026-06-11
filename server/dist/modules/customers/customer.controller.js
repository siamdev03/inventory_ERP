"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const customer_service_1 = require("./customer.service");
const createCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.CustomerServices.createCustomer(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Customer Created Successfully",
        data: result,
    });
});
const getCustomers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await customer_service_1.CustomerServices.getCustomers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Customers Retrieved Successfully",
        data: result,
    });
});
const getSingleCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await customer_service_1.CustomerServices.getSingleCustomer(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Customer Retrieved Successfully",
        data: result,
    });
});
const updateCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await customer_service_1.CustomerServices.updateCustomer(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Customer Updated Successfully",
        data: result,
    });
});
const deleteCustomer = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await customer_service_1.CustomerServices.deleteCustomer(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Customer Deleted Successfully",
        data: result,
    });
});
exports.CustomerControllers = {
    createCustomer,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
