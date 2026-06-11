import express from "express";

import { auth } from "../../middleware/auth";

import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  ProductControllers.createProduct
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  ProductControllers.getProducts
);

router.get(
  "/low-stock",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  ProductControllers.getLowStockProducts
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  ProductControllers.getSingleProduct
);

router.patch(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  ProductControllers.updateProduct
);

router.delete(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  ProductControllers.deleteProduct
);

export default router;