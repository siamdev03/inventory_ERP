import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { useUpdateCategoryMutation } from "@/redux/api/categoryApi";

interface Props {
  category: any;
  onClose: () => void;
}

const EditCategoryModal = ({
  category,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: category.name,
      description:
        category.description,
    },
  });

  const [
    updateCategory,
    { isLoading },
  ] =
    useUpdateCategoryMutation();

  const onSubmit = async (
    data: any
  ) => {
    try {
      await updateCategory({
        id: category._id,
        data,
      }).unwrap();

      toast.success(
        "Category Updated Successfully"
      );

      onClose();
    } catch {
      toast.error(
        "Failed to update category"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6">
          Edit Category
        </h2>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-4"
        >
          <input
            {...register("name")}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            {...register(
              "description"
            )}
            rows={4}
            className="w-full border rounded-xl p-3"
          />

          <button
            disabled={
              isLoading
            }
            className="w-full bg-green-600 text-white py-3 rounded-xl"
          >
            {isLoading
              ? "Updating..."
              : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;