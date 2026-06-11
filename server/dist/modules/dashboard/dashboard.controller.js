"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const dashboard_service_1 = require("./dashboard.service");
const getDashboardData = (0, catchAsync_1.default)(async (req, res) => {
    const result = await dashboard_service_1.DashboardServices.getDashboardData();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Dashboard Data Retrieved Successfully",
        data: result,
    });
});
exports.DashboardControllers = {
    getDashboardData,
};
