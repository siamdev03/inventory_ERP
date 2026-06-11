"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err?.statusCode || 500;
    let message = err?.message ||
        "Something went wrong";
    // Zod Error
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = err.issues
            .map((issue) => issue.message)
            .join(", ");
    }
    // Mongo Validation Error
    else if (err instanceof
        mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((el) => el.message)
            .join(", ");
    }
    // Duplicate Key Error
    else if (err?.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }
    // JWT Errors
    else if (err?.name ===
        "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid Token";
    }
    else if (err?.name ===
        "TokenExpiredError") {
        statusCode = 401;
        message = "Token Expired";
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV ===
            "development"
            ? err
            : undefined,
    });
};
exports.default = globalErrorHandler;
