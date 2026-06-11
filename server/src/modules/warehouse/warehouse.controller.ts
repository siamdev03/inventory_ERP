import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { WarehouseServices } from "./warehouse.service";

const createWarehouse = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await WarehouseServices.createWarehouse(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Warehouse Created Successfully",
      data: result,
    });
  }
);

const getWarehouses = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await WarehouseServices.getWarehouses();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Warehouses Retrieved Successfully",
      data: result,
    });
  }
);

const getSingleWarehouse =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await WarehouseServices.getSingleWarehouse(
          id
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Warehouse Retrieved Successfully",
        data: result,
      });
    }
  );

const updateWarehouse =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      const result =
        await WarehouseServices.updateWarehouse(
          id,
          req.body
        );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Warehouse Updated Successfully",
        data: result,
      });
    }
  );

const deleteWarehouse =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const id =
        req.params.id as string;

      await WarehouseServices.deleteWarehouse(
        id
      );

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Warehouse Deleted Successfully",
        data: null,
      });
    }
  );

export const WarehouseControllers =
  {
    createWarehouse,
    getWarehouses,
    getSingleWarehouse,
    updateWarehouse,
    deleteWarehouse,
  };