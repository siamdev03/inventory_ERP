"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const createToken_1 = require("../../utils/createToken");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const registerUser = async (payload) => {
    const user = await user_model_1.User.create(payload);
    return user;
};
const loginUser = async (payload) => {
    const user = await user_model_1.User.findOne({
        email: payload.email,
    }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const matched = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!matched) {
        throw new AppError_1.default(401, "Password Incorrect");
    }
    const accessToken = (0, createToken_1.createToken)({
        id: user._id.toString(),
        role: user.role,
        email: user.email,
    }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    const refreshToken = (0, createToken_1.createToken)({
        id: user._id.toString(),
        role: user.role,
        email: user.email,
    }, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
        user,
    };
};
const refreshToken = async (token) => {
    if (!token) {
        throw new AppError_1.default(401, "Refresh Token Required");
    }
    const actualToken = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;
    const decoded = jsonwebtoken_1.default.verify(actualToken, process.env.JWT_REFRESH_SECRET);
    const user = await user_model_1.User.findById(decoded.id);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    const newAccessToken = (0, createToken_1.createToken)({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    return {
        accessToken: newAccessToken,
    };
};
exports.AuthServices = {
    registerUser,
    loginUser,
    refreshToken,
};
