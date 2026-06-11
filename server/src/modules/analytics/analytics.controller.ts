import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AnalyticsServices } from "./analytics.service";

const getAnalyticsData =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await AnalyticsServices.getAnalyticsData();

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Analytics Data Retrieved Successfully",
        data: result,
      });
    }
  );

export const AnalyticsControllers =
  {
    getAnalyticsData,
  };