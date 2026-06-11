import { Supplier } from "./supplier.model";

const createSupplier = async (
  payload: any
) => {
  const supplier =
    await Supplier.create(payload);

  return supplier;
};

const getSuppliers = async () => {
  const suppliers =
    await Supplier.find();

  return suppliers;
};

const getSingleSupplier = async (
  id: string
) => {
  const supplier =
    await Supplier.findById(id);

  return supplier;
};

const updateSupplier = async (
  id: string,
  payload: any
) => {
  const supplier =
    await Supplier.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return supplier;
};

const deleteSupplier = async (
  id: string
) => {
  const supplier =
    await Supplier.findByIdAndDelete(
      id
    );

  return supplier;
};

export const SupplierServices = {
  createSupplier,
  getSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};