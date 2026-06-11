import express from "express";

import { auth } from "../../middleware/auth";

import { ReportControllers } from "./report.controller";

const router = express.Router();

router.get(
  "/purchases",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  ReportControllers.getPurchaseReport
);

router.get(
  "/sales",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  ReportControllers.getSalesReport
);

router.get(
  "/stock",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  ReportControllers.getStockReport
);

router.get(
  "/export/sales",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  ReportControllers.exportSalesExcel
);

export default router;