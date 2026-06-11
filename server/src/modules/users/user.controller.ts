import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/AppError";

import { UserServices } from "./user.service";

const getUsers = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await UserServices.getUsers();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Users Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleUser = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id as string;

    if (!id) {
      throw new AppError(
        400,
        "User ID is required"
      );
    }

    const result =
      await UserServices.getSingleUser(
        id
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "User Retrieved Successfully",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id as string;

    if (!id) {
      throw new AppError(
        400,
        "User ID is required"
      );
    }

    const result =
      await UserServices.updateUser(
        id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "User Updated Successfully",
      data: result,
    });
  }
);

const deleteUser = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id = req.params.id as string;

    if (!id) {
      throw new AppError(
        400,
        "User ID is required"
      );
    }

    await UserServices.deleteUser(
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "User Deleted Successfully",
      data: null,
    });
  }
);

export const UserControllers = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};