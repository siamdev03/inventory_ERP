import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { AuditLogServices } from "./auditLog.service";

const getAuditLogs = catchAsync(
  async (
    req: Request,
    res: Response
  ) => {
    const result =
      await AuditLogServices.getAuditLogs();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Audit Logs Retrieved Successfully",
      data: result,
    });
  }
);

export const AuditLogControllers =
  {
    getAuditLogs,
  };