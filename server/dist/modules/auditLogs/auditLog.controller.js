"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auditLog_service_1 = require("./auditLog.service");
const getAuditLogs = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auditLog_service_1.AuditLogServices.getAuditLogs();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Audit Logs Retrieved Successfully",
        data: result,
    });
});
exports.AuditLogControllers = {
    getAuditLogs,
};
