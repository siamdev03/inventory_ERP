"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const customer_model_1 = require("./customer.model");
const createCustomer = async (payload) => {
    const customer = await customer_model_1.Customer.create(payload);
    return customer;
};
const getCustomers = async () => {
    const customers = await customer_model_1.Customer.find();
    return customers;
};
const getSingleCustomer = async (id) => {
    const customer = await customer_model_1.Customer.findById(id);
    return customer;
};
const updateCustomer = async (id, payload) => {
    const customer = await customer_model_1.Customer.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return customer;
};
const deleteCustomer = async (id) => {
    const customer = await customer_model_1.Customer.findByIdAndDelete(id);
    return customer;
};
exports.CustomerServices = {
    createCustomer,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
