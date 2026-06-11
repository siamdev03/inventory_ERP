import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { CustomerServices } from "./customer.service";

const createCustomer = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await CustomerServices.createCustomer(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Customer Created Successfully",
      data: result,
    });
  }
);

const getCustomers = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await CustomerServices.getCustomers();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Customers Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleCustomer =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await CustomerServices.getSingleCustomer(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Customer Retrieved Successfully",
        data: result,
      });
    }
  );

const updateCustomer = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await CustomerServices.updateCustomer(
        id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Customer Updated Successfully",
      data: result,
    });
  }
);

const deleteCustomer = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await CustomerServices.deleteCustomer(
        id
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Customer Deleted Successfully",
      data: result,
    });
  }
);

export const CustomerControllers =
  {
    createCustomer,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
  };