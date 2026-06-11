"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), product_controller_1.ProductControllers.createProduct);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), product_controller_1.ProductControllers.getProducts);
router.get("/low-stock", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), product_controller_1.ProductControllers.getLowStockProducts);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), product_controller_1.ProductControllers.getSingleProduct);
router.patch("/:id", (0, auth_1.auth)("super_admin", "admin", "manager"), product_controller_1.ProductControllers.updateProduct);
router.delete("/:id", (0, auth_1.auth)("super_admin", "admin"), product_controller_1.ProductControllers.deleteProduct);
exports.default = router;
