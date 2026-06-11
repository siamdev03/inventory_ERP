import express from "express";

import { auth } from "../../middleware/auth";

import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  CategoryControllers.createCategory
);

router.get(
  "/",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  CategoryControllers.getCategories
);

router.get(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager",
    "staff"
  ),
  CategoryControllers.getSingleCategory
);
router.patch(
  "/:id",
  auth(
    "super_admin",
    "admin",
    "manager"
  ),
  CategoryControllers.updateCategory
);

router.delete(
  "/:id",
  auth(
    "super_admin",
    "admin"
  ),
  CategoryControllers.deleteCategory
);
export default router;