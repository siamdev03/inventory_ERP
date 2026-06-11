import express from "express";

import { auth } from "../../middleware/auth";

import { SaleControllers } from "./sale.controller";

const router =
  express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  SaleControllers.createSale
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  SaleControllers.getSales
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  SaleControllers.getSingleSale
);

export default router;