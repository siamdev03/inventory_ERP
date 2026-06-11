import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { ReportServices } from "./report.service";

const getPurchaseReport = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { startDate, endDate } =
      req.query;

    const result =
      await ReportServices.getPurchaseReport(
        startDate as string,
        endDate as string
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Purchase Report Retrieved Successfully",
      data: result,
    });
  }
);

const getSalesReport = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const { startDate, endDate } =
      req.query;

    const result =
      await ReportServices.getSalesReport(
        startDate as string,
        endDate as string
      );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Sales Report Retrieved Successfully",
      data: result,
    });
  }
);

const getStockReport = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await ReportServices.getStockReport();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Stock Report Retrieved Successfully",
      data: result,
    });
  }
);

const exportSalesExcel =
  catchAsync(
    async (
      req: Request,
      res: Response
    ) => {
      const workbook =
        await ReportServices.exportSalesExcel();

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=sales-report.xlsx"
      );

      await workbook.xlsx.write(
        res
      );

      res.end();
    }
  );

export const ReportControllers = {
  getPurchaseReport,
  getSalesReport,
  getStockReport,
  exportSalesExcel,
};