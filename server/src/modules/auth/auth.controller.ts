import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AuthServices } from "./auth.service";

const registerUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.registerUser(
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "User Registered Successfully",
      data: result,
    });
  }
);

const loginUser = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AuthServices.loginUser(
        req.body
      );

    res.cookie(
      "refreshToken",
      result.refreshToken,
      {
        httpOnly: true,
        secure: false,
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Login Successful",
      data: {
        accessToken:
          result.accessToken,
        user: result.user,
      },
    });
  }
);

const refreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const token =
      req.cookies?.refreshToken;

    const result =
      await AuthServices.refreshToken(
        token
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Access Token Generated Successfully",
      data: result,
    });
  }
);

const logoutUser = catchAsync(
  async (req: Request, res: Response) => {
    res.clearCookie(
      "refreshToken"
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Logout Successful",
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "User Retrieved Successfully",
      data: user,
    });
  }
);

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getMe,
};