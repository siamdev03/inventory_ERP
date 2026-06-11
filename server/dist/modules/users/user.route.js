"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.auth)("super_admin", "admin"), user_controller_1.UserControllers.getUsers);
router.get("/:id", (0, auth_1.auth)("super_admin", "admin"), user_controller_1.UserControllers.getSingleUser);
router.patch("/:id", (0, auth_1.auth)("super_admin"), user_controller_1.UserControllers.updateUser);
router.delete("/:id", (0, auth_1.auth)("super_admin"), user_controller_1.UserControllers.deleteUser);
exports.default = router;
