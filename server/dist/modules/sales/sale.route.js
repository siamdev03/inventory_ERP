"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const sale_controller_1 = require("./sale.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), sale_controller_1.SaleControllers.createSale);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), sale_controller_1.SaleControllers.getSales);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), sale_controller_1.SaleControllers.getSingleSale);
exports.default = router;
