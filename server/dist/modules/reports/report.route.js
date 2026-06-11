"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const report_controller_1 = require("./report.controller");
const router = express_1.default.Router();
router.get("/purchases", (0, auth_1.auth)("super_admin", "admin", "manager"), report_controller_1.ReportControllers.getPurchaseReport);
router.get("/sales", (0, auth_1.auth)("super_admin", "admin", "manager"), report_controller_1.ReportControllers.getSalesReport);
router.get("/stock", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), report_controller_1.ReportControllers.getStockReport);
router.get("/export/sales", (0, auth_1.auth)("super_admin", "admin", "manager"), report_controller_1.ReportControllers.exportSalesExcel);
exports.default = router;
