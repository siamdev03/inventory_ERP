"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.AuthControllers.registerUser);
router.post("/login", auth_controller_1.AuthControllers.loginUser);
router.post("/refresh-token", auth_controller_1.AuthControllers.refreshToken);
router.post("/logout", auth_controller_1.AuthControllers.logoutUser);
router.get("/me", (0, auth_1.auth)("super_admin", "admin", "manager", "employee"), auth_controller_1.AuthControllers.getMe);
exports.default = router;
