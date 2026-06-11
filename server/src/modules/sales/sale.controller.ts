import {
  Request,
  Response,
} from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { SaleServices } from "./sale.service";

const createSale = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await SaleServices.createSale(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Sale Created Successfully",
      data: result,
    });
  }
);

const getSales = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await SaleServices.getSales();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Sales Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleSale =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await SaleServices.getSingleSale(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Sale Retrieved Successfully",
        data: result,
      });
    }
  );

export const SaleControllers =
  {
    createSale,
    getSales,
    getSingleSale,
  };