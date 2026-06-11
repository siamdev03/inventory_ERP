import express from "express";

import { auth } from "../../middleware/auth";

import { CustomerControllers } from "./customer.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  CustomerControllers.createCustomer
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  CustomerControllers.getCustomers
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  CustomerControllers.getSingleCustomer
);

router.patch(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  CustomerControllers.updateCustomer
);

router.delete(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  CustomerControllers.deleteCustomer
);

export default router;