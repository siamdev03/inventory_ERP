import express from "express";

import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  AuthControllers.registerUser
);

router.post(
  "/login",
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  AuthControllers.refreshToken
);

router.post(
  "/logout",
  AuthControllers.logoutUser
);

router.get(
  "/me",
  auth(
    "super_admin",
    "admin",
    "manager",
    "employee"
  ),
  AuthControllers.getMe
);

export default router;