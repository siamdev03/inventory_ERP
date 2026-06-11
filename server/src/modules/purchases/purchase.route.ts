import express from "express";

import { auth } from "../../middleware/auth";

import { PurchaseControllers } from "./purchase.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  PurchaseControllers.createPurchase
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  PurchaseControllers.getPurchases
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  PurchaseControllers.getSinglePurchase
);

export default router;