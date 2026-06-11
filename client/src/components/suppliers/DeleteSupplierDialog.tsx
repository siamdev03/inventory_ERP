import { toast } from "sonner";

import {
  useDeleteSupplierMutation,
} from "@/redux/api/supplierApi";

const DeleteSupplierDialog = ({
  id,
  onClose,
}: any) => {
  const [
    deleteSupplier,
  ] =
    useDeleteSupplierMutation();

  const handleDelete =
    async () => {
      try {
        await deleteSupplier(
          id
        ).unwrap();

        toast.success(
          "Supplier Deleted Successfully"
        );

        onClose();
      } catch {
        toast.error(
          "Failed to delete supplier"
        );
      }
    };

  return (
    <div className="space-y-4">
      <p>
        Are you sure you want
        to delete this
        supplier?
      </p>

      <div className="flex gap-3">
        <button
          onClick={
            handleDelete
          }
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

        <button
          onClick={
            onClose
          }
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteSupplierDialog;