import { useForm } from "react-hook-form";

import { toast } from "sonner";

import {
  useCreateCategoryMutation,
} from "@/redux/api/categoryApi";

type CategoryFormData = {
  name: string;
  description: string;
};

const CreateCategoryModal = () => {
  const {
    register,
    handleSubmit,
    reset,
  } =
    useForm<CategoryFormData>();

  const [
    createCategory,
    { isLoading },
  ] =
    useCreateCategoryMutation();

  const onSubmit = async (
    data: CategoryFormData
  ) => {
    try {
      await createCategory(
        data
      ).unwrap();

      toast.success(
        "Category Created Successfully"
      );

      reset();
    } catch (
      error: any
    ) {
      console.error(
        error
      );

      toast.error(
        error?.data
          ?.message ||
          "Failed to create category"
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
            required:
              "Category name is required",
          }
        )}
        placeholder="Category Name"
        className="border p-2 w-full rounded"
      />

      <textarea
        {...register(
          "description"
        )}
        placeholder="Category Description"
        rows={4}
        className="border p-2 w-full rounded resize-none"
      />

      <button
        type="submit"
        disabled={
          isLoading
        }
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading
          ? "Creating..."
          : "Create Category"}
      </button>
    </form>
  );
};

export default CreateCategoryModal;