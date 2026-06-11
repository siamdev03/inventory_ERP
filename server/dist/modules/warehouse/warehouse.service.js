"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseServices = void 0;
const warehouse_model_1 = require("./warehouse.model");
const createWarehouse = async (payload) => {
    const warehouse = await warehouse_model_1.Warehouse.create(payload);
    return warehouse;
};
const getWarehouses = async () => {
    const warehouses = await warehouse_model_1.Warehouse.find();
    return warehouses;
};
const getSingleWarehouse = async (id) => {
    const warehouse = await warehouse_model_1.Warehouse.findById(id);
    return warehouse;
};
const updateWarehouse = async (id, payload) => {
    const warehouse = await warehouse_model_1.Warehouse.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return warehouse;
};
const deleteWarehouse = async (id) => {
    const warehouse = await warehouse_model_1.Warehouse.findByIdAndDelete(id);
    return warehouse;
};
exports.WarehouseServices = {
    createWarehouse,
    getWarehouses,
    getSingleWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
