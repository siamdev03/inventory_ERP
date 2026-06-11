"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("./user.model");
const getUsers = async () => {
    const users = await user_model_1.User.find();
    return users;
};
const getSingleUser = async (id) => {
    const user = await user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    return user;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    return user;
};
const deleteUser = async (id) => {
    const user = await user_model_1.User.findByIdAndDelete(id);
    if (!user) {
        throw new AppError_1.default(404, "User Not Found");
    }
    return null;
};
exports.UserServices = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
