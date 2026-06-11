import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useUpdateCustomerMutation,
} from "@/redux/api/customerApi";

interface Props {
  customer: any;
  onClose: () => void;
}

const EditCustomerModal = ({
  customer,
  onClose,
}: Props) => {
  const [
    updateCustomer,
    { isLoading },
  ] =
    useUpdateCustomerMutation();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues:
      customer,
  });

  const onSubmit =
    async (
      data: any
    ) => {
      try {
        const res =
          await updateCustomer(
            {
              id: customer._id,
              data,
            }
          ).unwrap();

        toast.success(
          res?.message ||
            "Customer Updated Successfully"
        );

        onClose();
      } catch (
        error: any
      ) {
        toast.error(
          error?.data
            ?.message ||
            "Failed to update customer"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-4xl font-bold">
            Edit Customer
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
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "phone"
            )}
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "email"
            )}
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "address"
            )}
            className="w-full border rounded-xl p-4"
          />

          <input
            {...register(
              "companyName"
            )}
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
              ? "Updating..."
              : "Update Customer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;