import { toast } from "sonner";

import {
  useDeleteCustomerMutation,
} from "@/redux/api/customerApi";

interface Props {
  id: string;
  onClose: () => void;
}

const DeleteCustomerDialog = ({
  id,
  onClose,
}: Props) => {
  const [
    deleteCustomer,
    { isLoading },
  ] =
    useDeleteCustomerMutation();

  const handleDelete =
    async () => {
      try {
        const res =
          await deleteCustomer(
            id
          ).unwrap();

        toast.success(
          res?.message ||
            "Customer Deleted Successfully"
        );

        onClose();
      } catch (
        error: any
      ) {
        toast.error(
          error?.data
            ?.message ||
            "Failed to delete customer"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4">
          Delete Customer
        </h2>

        <p className="text-slate-600 mb-6">
          Are you sure you want to
          delete this customer?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={
              handleDelete
            }
            disabled={
              isLoading
            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
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

export default DeleteCustomerDialog;