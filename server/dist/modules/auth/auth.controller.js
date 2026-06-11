"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User Registered Successfully",
        data: result,
    });
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthServices.loginUser(req.body);
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Login Successful",
        data: {
            accessToken: result.accessToken,
            user: result.user,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.cookies?.refreshToken;
    const result = await auth_service_1.AuthServices.refreshToken(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Access Token Generated Successfully",
        data: result,
    });
});
const logoutUser = (0, catchAsync_1.default)(async (req, res) => {
    res.clearCookie("refreshToken");
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Logout Successful",
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved Successfully",
        data: user,
    });
});
exports.AuthControllers = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    getMe,
};
