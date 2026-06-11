import express from "express";

import { auth } from "../../middleware/auth";

import { DashboardControllers } from "./dashboard.controller";

const router = express.Router();

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  DashboardControllers.getDashboardData
);

export default router;