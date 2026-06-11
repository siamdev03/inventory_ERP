import { Warehouse } from "./warehouse.model";

const createWarehouse = async (
  payload: any
) => {
  const warehouse =
    await Warehouse.create(payload);

  return warehouse;
};

const getWarehouses = async () => {
  const warehouses =
    await Warehouse.find();

  return warehouses;
};

const getSingleWarehouse =
  async (id: string) => {
    const warehouse =
      await Warehouse.findById(id);

    return warehouse;
  };

const updateWarehouse = async (
  id: string,
  payload: any
) => {
  const warehouse =
    await Warehouse.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return warehouse;
};

const deleteWarehouse = async (
  id: string
) => {
  const warehouse =
    await Warehouse.findByIdAndDelete(
      id
    );

  return warehouse;
};

export const WarehouseServices = {
  createWarehouse,
  getWarehouses,
  getSingleWarehouse,
  updateWarehouse,
  deleteWarehouse,
};