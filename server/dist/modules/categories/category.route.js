"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("super_admin", "admin", "manager"), category_controller_1.CategoryControllers.createCategory);
router.get("/", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), category_controller_1.CategoryControllers.getCategories);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin", "manager", "staff"), category_controller_1.CategoryControllers.getSingleCategory);
router.patch("/:id", (0, auth_1.auth)("super_admin", "admin", "manager"), category_controller_1.CategoryControllers.updateCategory);
router.delete("/:id", (0, auth_1.auth)("super_admin", "admin"), category_controller_1.CategoryControllers.deleteCategory);
exports.default = router;
