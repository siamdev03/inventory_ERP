import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateProductMutation } from "@/redux/api/productApi";

type ProductFormData = {
  name: string;
  sku: string;
  stock: number;
};

interface EditProductModalProps {
  product: {
    _id: string;
    name: string;
    sku: string;
    stock: number;
  };
  onClose: () => void;
}

const EditProductModal = ({
  product,
  onClose,
}: EditProductModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProductFormData>();

  const [
    updateProduct,
    { isLoading },
  ] = useUpdateProductMutation();

  useEffect(() => {
    reset({
      name: product.name,
      sku: product.sku,
      stock: product.stock,
    });
  }, [product, reset]);

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      await updateProduct({
        id: product._id,
        data,
      }).unwrap();

      toast.success(
        "Product Updated Successfully"
      );

      onClose();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.data?.message ||
          "Failed to update product"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">
            Edit Product
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            {...register("name")}
            placeholder="Product Name"
            className="border p-2 rounded w-full"
          />

          <input
            {...register("sku")}
            placeholder="SKU"
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
            placeholder="Stock"
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
          >
            {isLoading
              ? "Updating..."
              : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;