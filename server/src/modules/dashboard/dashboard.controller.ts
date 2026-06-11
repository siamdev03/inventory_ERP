import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { DashboardServices } from "./dashboard.service";

const getDashboardData =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await DashboardServices.getDashboardData();

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Dashboard Data Retrieved Successfully",
        data: result,
      });
    }
  );

export const DashboardControllers =
  {
    getDashboardData,
  };