"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const auth = (...roles) => (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        throw new AppError_1.default(401, "Unauthorized");
    }
    const token = authorizationToken.startsWith("Bearer ")
        ? authorizationToken.split(" ")[1]
        : authorizationToken;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (roles.length &&
        !roles.includes(decoded.role)) {
        throw new AppError_1.default(403, "Forbidden");
    }
    req.user = decoded;
    next();
};
exports.auth = auth;
