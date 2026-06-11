"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierServices = void 0;
const supplier_model_1 = require("./supplier.model");
const createSupplier = async (payload) => {
    const supplier = await supplier_model_1.Supplier.create(payload);
    return supplier;
};
const getSuppliers = async () => {
    const suppliers = await supplier_model_1.Supplier.find();
    return suppliers;
};
const getSingleSupplier = async (id) => {
    const supplier = await supplier_model_1.Supplier.findById(id);
    return supplier;
};
const updateSupplier = async (id, payload) => {
    const supplier = await supplier_model_1.Supplier.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return supplier;
};
const deleteSupplier = async (id) => {
    const supplier = await supplier_model_1.Supplier.findByIdAndDelete(id);
    return supplier;
};
exports.SupplierServices = {
    createSupplier,
    getSuppliers,
    getSingleSupplier,
    updateSupplier,
    deleteSupplier,
};
