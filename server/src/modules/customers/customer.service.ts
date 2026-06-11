import { Customer } from "./customer.model";

const createCustomer = async (
  payload: any
) => {
  const customer =
    await Customer.create(payload);

  return customer;
};

const getCustomers = async () => {
  const customers =
    await Customer.find();

  return customers;
};

const getSingleCustomer = async (
  id: string
) => {
  const customer =
    await Customer.findById(id);

  return customer;
};

const updateCustomer = async (
  id: string,
  payload: any
) => {
  const customer =
    await Customer.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return customer;
};

const deleteCustomer = async (
  id: string
) => {
  const customer =
    await Customer.findByIdAndDelete(
      id
    );

  return customer;
};

export const CustomerServices = {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};