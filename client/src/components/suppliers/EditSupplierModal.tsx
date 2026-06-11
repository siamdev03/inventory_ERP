import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useUpdateSupplierMutation,
} from "@/redux/api/supplierApi";

const EditSupplierModal = ({
  supplier,
  onClose,
}: any) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues:
      supplier,
  });

  const [
    updateSupplier,
    { isLoading },
  ] =
    useUpdateSupplierMutation();

  const onSubmit = async (
    data: any
  ) => {
    try {
      await updateSupplier({
        id:
          supplier._id,
        data,
      }).unwrap();

      toast.success(
        "Supplier Updated Successfully"
      );

      onClose();
    } catch {
      toast.error(
        "Failed to update supplier"
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
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register(
          "companyName"
        )}
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register("email")}
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register("phone")}
        className="border p-3 rounded-lg w-full"
      />

      <textarea
        {...register(
          "address"
        )}
        rows={3}
        className="border p-3 rounded-lg w-full"
      />

      <select
        {...register(
          "status"
        )}
        className="border p-3 rounded-lg w-full"
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
        className="bg-amber-500 text-white px-4 py-2 rounded-lg"
      >
        Update Supplier
      </button>
    </form>
  );
};

export default EditSupplierModal;