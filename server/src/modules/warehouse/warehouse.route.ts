import express from "express";

import { auth } from "../../middleware/auth";

import { WarehouseControllers } from "./warehouse.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  WarehouseControllers.createWarehouse
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  WarehouseControllers.getWarehouses
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  WarehouseControllers.getSingleWarehouse
);

router.patch(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  WarehouseControllers.updateWarehouse
);

router.delete(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  WarehouseControllers.deleteWarehouse
);

export default router;