import express from "express";

import { auth } from "../../middleware/auth";

import { SupplierControllers } from "./supplier.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  SupplierControllers.createSupplier
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  SupplierControllers.getSuppliers
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  SupplierControllers.getSingleSupplier
);

router.patch(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  SupplierControllers.updateSupplier
);

router.delete(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  SupplierControllers.deleteSupplier
);

export default router;