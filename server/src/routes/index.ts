import express from "express";

import authRoutes from "../modules/auth/auth.route";
import userRoutes from "../modules/users/user.route";
import productRoutes from "../modules/products/product.route";
import categoryRoutes from "../modules/categories/category.route";
import warehouseRoutes from "../modules/warehouse/warehouse.route";
import supplierRoutes from "../modules/suppliers/supplier.route";
import purchaseRoutes from "../modules/purchases/purchase.route";
import saleRoutes from "../modules/sales/sale.route";
import customerRoutes from "../modules/customers/customer.route";
import dashboardRoutes from "../modules/dashboard/dashboard.route";
import analyticsRoutes from "../modules/analytics/analytics.route";
import reportRoutes from "../modules/reports/report.route";
import auditLogRoutes from "../modules/auditLogs/auditLog.route";
const router = express.Router();

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/users",
  userRoutes
);
router.use(
  "/products",
  productRoutes
);
router.use(
  "/categories",
  categoryRoutes
);
router.use(
  "/warehouses",
  warehouseRoutes
);
router.use(
  "/suppliers",
  supplierRoutes
);
router.use(
  "/purchases",
  purchaseRoutes
);
router.use(
  "/sales",
  saleRoutes
);
router.use(
  "/customers",
  customerRoutes
);
router.use(
  "/dashboard",
  dashboardRoutes
);
router.use(
  "/analytics",
  analyticsRoutes
);
router.use(
  "/reports",
  reportRoutes
);
router.use(
  "/audit-logs",
  auditLogRoutes
);
export default router;