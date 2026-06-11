import express from "express";

import { auth } from "../../middleware/auth";

import { UserControllers } from "./user.controller";

const router = express.Router();

router.get(
  "/",
  auth(
    "super_admin",
    "admin"
  ),
  UserControllers.getUsers
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  UserControllers.getSingleUser
);

router.patch(
  "/:id",
  auth("super_admin"),
  UserControllers.updateUser
);

router.delete(
  "/:id",
  auth("super_admin"),
  UserControllers.deleteUser
);

export default router;