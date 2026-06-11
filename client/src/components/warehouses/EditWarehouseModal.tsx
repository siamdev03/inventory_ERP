import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useUpdateWarehouseMutation,
} from "@/redux/api/warehouseApi";

const EditWarehouseModal = ({
  warehouse,
  onClose,
}: any) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: warehouse,
  });

  const [
    updateWarehouse,
    { isLoading },
  ] =
    useUpdateWarehouseMutation();

  const onSubmit = async (
    data: any
  ) => {
    try {
      await updateWarehouse({
        id: warehouse._id,
        data,
      }).unwrap();

      toast.success(
        "Warehouse Updated Successfully"
      );

      onClose();
    } catch {
      toast.error(
        "Failed to update warehouse"
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
        {...register("name")}
        className="border p-2 w-full rounded"
      />

      <input
        {...register("code")}
        className="border p-2 w-full rounded"
      />

      <input
        {...register("city")}
        className="border p-2 w-full rounded"
      />

      <input
        {...register("managerName")}
        className="border p-2 w-full rounded"
      />

      <input
        {...register("phone")}
        className="border p-2 w-full rounded"
      />

      <textarea
        {...register("address")}
        rows={3}
        className="border p-2 w-full rounded"
      />

      <select
        {...register("status")}
        className="border p-2 w-full rounded"
      >
        <option value="active">
          Active
        </option>

        <option value="inactive">
          Inactive
        </option>
      </select>

      <button
        type="submit"
        disabled={
          isLoading
        }
        className="bg-amber-500 text-white px-4 py-2 rounded"
      >
        {isLoading
          ? "Updating..."
          : "Update Warehouse"}
      </button>
    </form>
  );
};

export default EditWarehouseModal;