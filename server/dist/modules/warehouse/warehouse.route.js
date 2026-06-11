"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const warehouse_controller_1 = require("./warehouse.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), warehouse_controller_1.WarehouseControllers.createWarehouse);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), warehouse_controller_1.WarehouseControllers.getWarehouses);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), warehouse_controller_1.WarehouseControllers.getSingleWarehouse);
router.patch("/:id", (0, auth_1.auth)("super_admin", "admin"), warehouse_controller_1.WarehouseControllers.updateWarehouse);
router.delete("/:id", (0, auth_1.auth)("super_admin", "admin"), warehouse_controller_1.WarehouseControllers.deleteWarehouse);
exports.default = router;
