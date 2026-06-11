import express from "express";

import { auth } from "../../middleware/auth";

import { AnalyticsControllers } from "./analytics.controller";

const router = express.Router();

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  AnalyticsControllers.getAnalyticsData
);

export default router;