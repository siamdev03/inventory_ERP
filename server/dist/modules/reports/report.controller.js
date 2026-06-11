"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const report_service_1 = require("./report.service");
const getPurchaseReport = (0, catchAsync_1.default)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const result = await report_service_1.ReportServices.getPurchaseReport(startDate, endDate);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Purchase Report Retrieved Successfully",
        data: result,
    });
});
const getSalesReport = (0, catchAsync_1.default)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const result = await report_service_1.ReportServices.getSalesReport(startDate, endDate);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Sales Report Retrieved Successfully",
        data: result,
    });
});
const getStockReport = (0, catchAsync_1.default)(async (req, res) => {
    const result = await report_service_1.ReportServices.getStockReport();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Stock Report Retrieved Successfully",
        data: result,
    });
});
const exportSalesExcel = (0, catchAsync_1.default)(async (req, res) => {
    const workbook = await report_service_1.ReportServices.exportSalesExcel();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=sales-report.xlsx");
    await workbook.xlsx.write(res);
    res.end();
});
exports.ReportControllers = {
    getPurchaseReport,
    getSalesReport,
    getStockReport,
    exportSalesExcel,
};
