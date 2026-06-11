"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const warehouse_service_1 = require("./warehouse.service");
const createWarehouse = (0, catchAsync_1.default)(async (req, res) => {
    const result = await warehouse_service_1.WarehouseServices.createWarehouse(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Warehouse Created Successfully",
        data: result,
    });
});
const getWarehouses = (0, catchAsync_1.default)(async (req, res) => {
    const result = await warehouse_service_1.WarehouseServices.getWarehouses();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Warehouses Retrieved Successfully",
        data: result,
    });
});
const getSingleWarehouse = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await warehouse_service_1.WarehouseServices.getSingleWarehouse(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Warehouse Retrieved Successfully",
        data: result,
    });
});
const updateWarehouse = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await warehouse_service_1.WarehouseServices.updateWarehouse(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Warehouse Updated Successfully",
        data: result,
    });
});
const deleteWarehouse = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    await warehouse_service_1.WarehouseServices.deleteWarehouse(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Warehouse Deleted Successfully",
        data: null,
    });
});
exports.WarehouseControllers = {
    createWarehouse,
    getWarehouses,
    getSingleWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
