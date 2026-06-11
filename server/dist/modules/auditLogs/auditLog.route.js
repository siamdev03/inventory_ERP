"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const auditLog_controller_1 = require("./auditLog.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)("super_admin", "admin"), auditLog_controller_1.AuditLogControllers.getAuditLogs);
exports.default = router;
