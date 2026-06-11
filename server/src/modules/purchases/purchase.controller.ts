import {
  Request,
  Response,
} from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { PurchaseServices } from "./purchase.service";

const createPurchase = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await PurchaseServices.createPurchase(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Purchase Created Successfully",
      data: result,
    });
  }
);

const getPurchases = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await PurchaseServices.getPurchases();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Purchases Retrieved Successfully",
      data: result,
    });
  }
);

const getSinglePurchase =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await PurchaseServices.getSinglePurchase(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Purchase Retrieved Successfully",
        data: result,
      });
    }
  );

export const PurchaseControllers =
  {
    createPurchase,
    getPurchases,
    getSinglePurchase,
  };