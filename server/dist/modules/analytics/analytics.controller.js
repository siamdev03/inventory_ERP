"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const analytics_service_1 = require("./analytics.service");
const getAnalyticsData = (0, catchAsync_1.default)(async (req, res) => {
    const result = await analytics_service_1.AnalyticsServices.getAnalyticsData();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Analytics Data Retrieved Successfully",
        data: result,
    });
});
exports.AnalyticsControllers = {
    getAnalyticsData,
};
