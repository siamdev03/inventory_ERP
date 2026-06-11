"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const customer_controller_1 = require("./customer.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), customer_controller_1.CustomerControllers.createCustomer);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), customer_controller_1.CustomerControllers.getCustomers);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), customer_controller_1.CustomerControllers.getSingleCustomer);
router.patch("/:id", (0, auth_1.auth)("super_admin", "admin", "manager"), customer_controller_1.CustomerControllers.updateCustomer);
router.delete("/:id", (0, auth_1.auth)("super_admin", "admin"), customer_controller_1.CustomerControllers.deleteCustomer);
exports.default = router;
