import express from "express";

import { auth } from "../../middleware/auth";

import { AuditLogControllers } from "./auditLog.controller";

const router = express.Router();

router.get(
  "/",
  auth(
    "super_admin",
    "admin"
  ),
  AuditLogControllers.getAuditLogs
);

export default router;