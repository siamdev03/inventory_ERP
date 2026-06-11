import { useForm } from "react-hook-form";

import { toast } from "sonner";

import {
  useCreateProductMutation,
} from "@/redux/api/productApi";

import {
  useGetCategoriesQuery,
} from "@/redux/api/categoryApi";

import {
  useGetWarehousesQuery,
} from "@/redux/api/warehouseApi";

type ProductFormData = {
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  warehouse: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
};

const CreateProductModal = () => {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<ProductFormData>();

  const [
    createProduct,
    { isLoading },
  ] =
    useCreateProductMutation();

  const {
    data: categoryData,
  } =
    useGetCategoriesQuery(
      undefined
    );

  const {
    data: warehouseData,
  } =
    useGetWarehousesQuery(
      undefined
    );

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      await createProduct({
        ...data,
        createdBy: "SYSTEM",
      }).unwrap();

      toast.success(
        "Product Created Successfully"
      );

      reset();
    } catch (
      error: any
    ) {
      console.error(
        error
      );

      toast.error(
        error?.data
          ?.message ||
          "Failed to create product"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        {...register(
          "name"
        )}
        placeholder="Product Name"
        className="border p-2 w-full rounded"
      />

      <input
        {...register(
          "sku"
        )}
        placeholder="SKU"
        className="border p-2 w-full rounded"
      />

      <input
        {...register(
          "barcode"
        )}
        placeholder="Barcode"
        className="border p-2 w-full rounded"
      />

      {/* Category Dropdown */}
      <select
        {...register(
          "category"
        )}
        className="border p-2 w-full rounded"
      >
        <option value="">
          Select Category
        </option>

        {categoryData?.data?.map(
          (
            category: any
          ) => (
            <option
              key={
                category._id
              }
              value={
                category._id
              }
            >
              {
                category.name
              }
            </option>
          )
        )}
      </select>

      {/* Warehouse Dropdown */}
      <select
        {...register(
          "warehouse"
        )}
        className="border p-2 w-full rounded"
      >
        <option value="">
          Select Warehouse
        </option>

        {warehouseData?.data?.map(
          (
            warehouse: any
          ) => (
            <option
              key={
                warehouse._id
              }
              value={
                warehouse.name
              }
            >
              {
                warehouse.name
              }
            </option>
          )
        )}
      </select>

      <input
        type="number"
        {...register(
          "purchasePrice",
          {
            valueAsNumber:
              true,
          }
        )}
        placeholder="Purchase Price"
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        {...register(
          "sellingPrice",
          {
            valueAsNumber:
              true,
          }
        )}
        placeholder="Selling Price"
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        {...register(
          "stock",
          {
            valueAsNumber:
              true,
          }
        )}
        placeholder="Stock"
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        disabled={
          isLoading
        }
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {isLoading
          ? "Creating..."
          : "Create Product"}
      </button>
    </form>
  );
};

export default CreateProductModal;