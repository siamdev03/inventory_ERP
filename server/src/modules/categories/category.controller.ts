import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { CategoryServices } from "./category.service";

const createCategory = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await CategoryServices.createCategory(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Category Created Successfully",
      data: result,
    });
  }
);

const getCategories = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await CategoryServices.getCategories();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Categories Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleCategory = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await CategoryServices.getSingleCategory(
        id
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Category Retrieved Successfully",
      data: result,
    });
  }
);
const updateCategory = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await CategoryServices.updateCategory(
        id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Category Updated Successfully",
      data: result,
    });
  }
);

const deleteCategory = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    await CategoryServices.deleteCategory(
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Category Deleted Successfully",
      data: null,
    });
  }
);
export const CategoryControllers = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};