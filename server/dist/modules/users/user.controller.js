"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_service_1 = require("./user.service");
const getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.getUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Users Retrieved Successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new AppError_1.default(400, "User ID is required");
    }
    const result = await user_service_1.UserServices.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved Successfully",
        data: result,
    });
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new AppError_1.default(400, "User ID is required");
    }
    const result = await user_service_1.UserServices.updateUser(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Updated Successfully",
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        throw new AppError_1.default(400, "User ID is required");
    }
    await user_service_1.UserServices.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Deleted Successfully",
        data: null,
    });
});
exports.UserControllers = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
