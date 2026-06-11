"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategory = async (payload) => {
    return await category_model_1.Category.create(payload);
};
const getCategories = async () => {
    return await category_model_1.Category.find();
};
const getSingleCategory = async (id) => {
    return await category_model_1.Category.findById(id);
};
const updateCategory = async (id, payload) => {
    return await category_model_1.Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};
const deleteCategory = async (id) => {
    return await category_model_1.Category.findByIdAndDelete(id);
};
exports.CategoryServices = {
    createCategory,
    getCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
