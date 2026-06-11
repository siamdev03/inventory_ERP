import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ProductServices } from "./product.service";

const createProduct = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ProductServices.createProduct(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Product Created Successfully",
      data: result,
    });
  }
);

const getProducts = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ProductServices.getProducts(
        req.query
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Products Retrieved Successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleProduct = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await ProductServices.getSingleProduct(
        id
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Product Retrieved Successfully",
      data: result,
    });
  }
);

const updateProduct = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await ProductServices.updateProduct(
        id,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Product Updated Successfully",
      data: result,
    });
  }
);

const deleteProduct = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const id =
      req.params.id as string;

    const result =
      await ProductServices.deleteProduct(
        id
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Product Deleted Successfully",
      data: result,
    });
  }
);

const getLowStockProducts =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const result =
        await ProductServices.getLowStockProducts();

      sendResponse(res, {
        success: true,
        statusCode: 200,
        message:
          "Low Stock Products Retrieved Successfully",
        data: result,
      });
    }
  );

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
};