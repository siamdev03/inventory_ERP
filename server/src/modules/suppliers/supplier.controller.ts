import {
  Request,
  Response,
} from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { SupplierServices } from "./supplier.service";

const createSupplier = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await SupplierServices.createSupplier(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Supplier Created Successfully",
      data: result,
    });
  }
);

const getSuppliers = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await SupplierServices.getSuppliers();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Suppliers Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleSupplier =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await SupplierServices.getSingleSupplier(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Supplier Retrieved Successfully",
        data: result,
      });
    }
  );

const updateSupplier =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await SupplierServices.updateSupplier(
          id,
          req.body
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Supplier Updated Successfully",
        data: result,
      });
    }
  );

const deleteSupplier =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await SupplierServices.deleteSupplier(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Supplier Deleted Successfully",
        data: result,
      });
    }
  );

export const SupplierControllers = {
  createSupplier,
  getSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};