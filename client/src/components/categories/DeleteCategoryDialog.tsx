import { toast } from "sonner";

import { useDeleteCategoryMutation } from "@/redux/api/categoryApi";

interface Props {
  categoryId: string;
  categoryName: string;
  onClose: () => void;
}

const DeleteCategoryDialog = ({
  categoryId,
  categoryName,
  onClose,
}: Props) => {
  const [
    deleteCategory,
    { isLoading },
  ] =
    useDeleteCategoryMutation();

  const handleDelete =
    async () => {
      try {
        await deleteCategory(
          categoryId
        ).unwrap();

        toast.success(
          "Category Deleted Successfully"
        );

        onClose();
      } catch {
        toast.error(
          "Failed to delete category"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Delete Category
        </h2>

        <p className="text-slate-600 mb-6">
          Are you sure you want
          to delete
          <span className="font-semibold">
            {" "}
            {categoryName}
          </span>
          ?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border rounded-xl py-3"
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
            className="flex-1 bg-red-600 text-white rounded-xl py-3"
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

export default DeleteCategoryDialog;