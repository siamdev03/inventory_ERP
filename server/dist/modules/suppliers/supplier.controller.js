"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const supplier_service_1 = require("./supplier.service");
const createSupplier = (0, catchAsync_1.default)(async (req, res) => {
    const result = await supplier_service_1.SupplierServices.createSupplier(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Supplier Created Successfully",
        data: result,
    });
});
const getSuppliers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await supplier_service_1.SupplierServices.getSuppliers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Suppliers Retrieved Successfully",
        data: result,
    });
});
const getSingleSupplier = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await supplier_service_1.SupplierServices.getSingleSupplier(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Supplier Retrieved Successfully",
        data: result,
    });
});
const updateSupplier = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await supplier_service_1.SupplierServices.updateSupplier(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Supplier Updated Successfully",
        data: result,
    });
});
const deleteSupplier = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await supplier_service_1.SupplierServices.deleteSupplier(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Supplier Deleted Successfully",
        data: result,
    });
});
exports.SupplierControllers = {
    createSupplier,
    getSuppliers,
    getSingleSupplier,
    updateSupplier,
    deleteSupplier,
};
