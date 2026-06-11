import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCreateCustomerMutation,
} from "@/redux/api/customerApi";

interface Props {
  onClose: () => void;
}

const CreateCustomerModal = ({
  onClose,
}: Props) => {
  const [
    createCustomer,
    { isLoading },
  ] =
    useCreateCustomerMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit =
    async (
      data: any
    ) => {
      try {
        const res =
          await createCustomer(
            data
          ).unwrap();

        toast.success(
          res?.message ||
            "Customer Created Successfully"
        );

        reset();

        onClose();
      } catch (
        error: any
      ) {
        toast.error(
          error?.data
            ?.message ||
            "Failed to create customer"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-4xl font-bold">
            Create Customer
          </h2>

          <button
            onClick={onClose}
            className="text-5xl text-slate-400 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="p-8 space-y-5"
        >
          <input
            {...register(
              "name"
            )}
            placeholder="Customer Name"
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "phone"
            )}
            placeholder="Phone Number"
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "email"
            )}
            placeholder="Email"
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "address"
            )}
            placeholder="Address"
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "companyName"
            )}
            placeholder="Company Name (Optional)"
            className="w-full border rounded-xl p-4"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              {...register(
                "customerType"
              )}
              className="border rounded-xl p-4"
            >
              <option value="regular">
                Regular
              </option>

              <option value="wholesale">
                Wholesale
              </option>

              <option value="vip">
                VIP
              </option>
            </select>

            <select
              {...register(
                "status"
              )}
              className="border rounded-xl p-4"
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={
              isLoading
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
          >
            {isLoading
              ? "Creating..."
              : "Create Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerModal;