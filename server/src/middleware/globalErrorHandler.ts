import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode =
    err?.statusCode || 500;

  let message =
    err?.message ||
    "Something went wrong";

  // Zod Error
  if (err instanceof ZodError) {
    statusCode = 400;

    message = err.issues
      .map((issue) => issue.message)
      .join(", ");
  }

  // Mongo Validation Error
  else if (
    err instanceof
    mongoose.Error.ValidationError
  ) {
    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map((el: any) => el.message)
      .join(", ");
  }

  // Duplicate Key Error
  else if (err?.code === 11000) {
    statusCode = 409;

    const field = Object.keys(
      err.keyValue
    )[0];

    message = `${field} already exists`;
  }

  // JWT Errors
  else if (
    err?.name ===
    "JsonWebTokenError"
  ) {
    statusCode = 401;
    message = "Invalid Token";
  } else if (
    err?.name ===
    "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Token Expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV ===
      "development"
        ? err
        : undefined,
  });
};

export default globalErrorHandler;