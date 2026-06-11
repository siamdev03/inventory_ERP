import { toast } from "sonner";

import {
  useDeleteWarehouseMutation,
} from "@/redux/api/warehouseApi";

const DeleteWarehouseDialog = ({
  id,
  onClose,
}: any) => {
  const [
    deleteWarehouse,
  ] =
    useDeleteWarehouseMutation();

  const handleDelete =
    async () => {
      try {
        await deleteWarehouse(
          id
        ).unwrap();

        toast.success(
          "Warehouse Deleted Successfully"
        );

        onClose();
      } catch {
        toast.error(
          "Failed to delete warehouse"
        );
      }
    };

  return (
    <div className="space-y-4">
      <p>
        Are you sure you want
        to delete this
        warehouse?
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

export default DeleteWarehouseDialog;