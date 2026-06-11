"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryServices.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Category Created Successfully",
        data: result,
    });
});
const getCategories = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryServices.getCategories();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Categories Retrieved Successfully",
        data: result,
    });
});
const getSingleCategory = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await category_service_1.CategoryServices.getSingleCategory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category Retrieved Successfully",
        data: result,
    });
});
const updateCategory = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await category_service_1.CategoryServices.updateCategory(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category Updated Successfully",
        data: result,
    });
});
const deleteCategory = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    await category_service_1.CategoryServices.deleteCategory(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category Deleted Successfully",
        data: null,
    });
});
exports.CategoryControllers = {
    createCategory,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
