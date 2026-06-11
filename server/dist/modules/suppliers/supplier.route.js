"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const supplier_controller_1 = require("./supplier.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), supplier_controller_1.SupplierControllers.createSupplier);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), supplier_controller_1.SupplierControllers.getSuppliers);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), supplier_controller_1.SupplierControllers.getSingleSupplier);
router.patch("/:id", (0, auth_1.auth)("super_admin", "admin", "manager"), supplier_controller_1.SupplierControllers.updateSupplier);
router.delete("/:id", (0, auth_1.auth)("super_admin", "admin"), supplier_controller_1.SupplierControllers.deleteSupplier);
exports.default = router;
