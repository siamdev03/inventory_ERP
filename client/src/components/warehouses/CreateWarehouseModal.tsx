import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCreateWarehouseMutation,
} from "@/redux/api/warehouseApi";

type WarehouseFormData = {
  name: string;
  code: string;
  address: string;
  city: string;
  managerName: string;
  phone: string;
  status: "active" | "inactive";
};

const CreateWarehouseModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<WarehouseFormData>({
      defaultValues: {
        status: "active",
      },
    });

  const [
    createWarehouse,
    { isLoading },
  ] =
    useCreateWarehouseMutation();

  const onSubmit = async (
    data: WarehouseFormData
  ) => {
    try {
      await createWarehouse(
        data
      ).unwrap();

      toast.success(
        "Warehouse Created Successfully"
      );

      reset();

      onClose();
    } catch (
      error: any
    ) {
      console.error(
        error
      );

      toast.error(
        error?.data
          ?.message ||
          "Failed to create warehouse"
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
          "name",
          {
            required: true,
          }
        )}
        placeholder="Warehouse Name"
        className="w-full border p-3 rounded-lg"
      />

      <input
        {...register(
          "code",
          {
            required: true,
          }
        )}
        placeholder="Warehouse Code"
        className="w-full border p-3 rounded-lg"
      />

      <input
        {...register(
          "managerName",
          {
            required: true,
          }
        )}
        placeholder="Manager Name"
        className="w-full border p-3 rounded-lg"
      />

      <input
        {...register(
          "phone",
          {
            required: true,
          }
        )}
        placeholder="Phone Number"
        className="w-full border p-3 rounded-lg"
      />

      <input
        {...register(
          "city",
          {
            required: true,
          }
        )}
        placeholder="City"
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        {...register(
          "address",
          {
            required: true,
          }
        )}
        placeholder="Address"
        rows={3}
        className="w-full border p-3 rounded-lg resize-none"
      />

      <select
        {...register(
          "status"
        )}
        className="w-full border p-3 rounded-lg"
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
        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
      >
        {isLoading
          ? "Creating..."
          : "Create Warehouse"}
      </button>
    </form>
  );
};

export default CreateWarehouseModal;