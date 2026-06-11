import { toast } from "sonner";

import { useDeleteProductMutation } from "@/redux/api/productApi";

interface DeleteProductDialogProps {
  productId: string;
  productName: string;
  onClose: () => void;
}

const DeleteProductDialog = ({
  productId,
  productName,
  onClose,
}: DeleteProductDialogProps) => {
  const [
    deleteProduct,
    { isLoading },
  ] = useDeleteProductMutation();

  const handleDelete =
    async () => {
      try {
        await deleteProduct(
          productId
        ).unwrap();

        toast.success(
          `${productName} deleted successfully`
        );

        onClose();
      } catch (error: any) {
        console.error(error);

        toast.error(
          error?.data?.message ||
            "Failed to delete product"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-3">
          Delete Product
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to
          delete{" "}
          <span className="font-semibold">
            {productName}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialog;