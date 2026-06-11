import { Category } from "./category.model";

const createCategory = async (
  payload: any
) => {
  return await Category.create(payload);
};

const getCategories = async () => {
  return await Category.find();
};

const getSingleCategory = async (
  id: string
) => {
  return await Category.findById(id);
};

const updateCategory = async (
  id: string,
  payload: any
) => {
  return await Category.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteCategory = async (
  id: string
) => {
  return await Category.findByIdAndDelete(
    id
  );
};

export const CategoryServices = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};