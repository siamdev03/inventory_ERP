"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const purchase_controller_1 = require("./purchase.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), purchase_controller_1.PurchaseControllers.createPurchase);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), purchase_controller_1.PurchaseControllers.getPurchases);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), purchase_controller_1.PurchaseControllers.getSinglePurchase);
exports.default = router;
