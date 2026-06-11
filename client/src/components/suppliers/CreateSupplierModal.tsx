import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCreateSupplierMutation,
} from "@/redux/api/supplierApi";

type SupplierFormData = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  status:
    | "active"
    | "inactive";
};

const CreateSupplierModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<SupplierFormData>({
      defaultValues: {
        status: "active",
      },
    });

  const [
    createSupplier,
    { isLoading },
  ] =
    useCreateSupplierMutation();

  const onSubmit = async (
    data: SupplierFormData
  ) => {
    try {
      await createSupplier(
        data
      ).unwrap();

      toast.success(
        "Supplier Created Successfully"
      );

      reset();

      onClose();
    } catch {
      toast.error(
        "Failed to create supplier"
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
        placeholder="Supplier Name"
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register(
          "companyName"
        )}
        placeholder="Company Name"
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register("email")}
        placeholder="Email"
        className="border p-3 rounded-lg w-full"
      />

      <input
        {...register("phone")}
        placeholder="Phone"
        className="border p-3 rounded-lg w-full"
      />

      <textarea
        {...register(
          "address"
        )}
        placeholder="Address"
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
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        {isLoading
          ? "Creating..."
          : "Create Supplier"}
      </button>
    </form>
  );
};

export default CreateSupplierModal;