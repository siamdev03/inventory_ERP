import { useState } from "react";

import {
  Search,
  FolderTree,
  Plus,
} from "lucide-react";

import CreateCategoryModal from "@/components/categories/CreateCategoryModal";
import EditCategoryModal from "@/components/categories/EditCategoryModal";
import DeleteCategoryDialog from "@/components/categories/DeleteCategoryDialog";

import {
  useGetCategoriesQuery,
} from "@/redux/api/categoryApi";

const Categories = () => {
  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    openCreateModal,
    setOpenCreateModal,
  ] = useState(false);

  const [
    editingCategory,
    setEditingCategory,
  ] = useState<any>(null);

  const [
    deletingCategory,
    setDeletingCategory,
  ] = useState<any>(null);

  const {
    data,
    isLoading,
    isError,
  } = useGetCategoriesQuery(
    {
      searchTerm,
    }
  );

  if (isLoading) {
    return (
      <div className="p-10">
        Loading Categories...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Failed to load categories
      </div>
    );
  }

  const categories =
    data?.data || [];

  return (
    <>
      <div className="space-y-6">
        {/* Hero Section */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">
                Categories
              </h1>

              <p className="text-green-100 mt-2">
                Organize and manage
                product categories
                efficiently.
              </p>
            </div>

            <div className="bg-white/20 px-6 py-4 rounded-2xl">
              <p className="text-sm">
                Total Categories
              </p>

              <h2 className="text-3xl font-bold">
                {
                  categories.length
                }
              </h2>
            </div>
          </div>
        </div>

        {/* Toolbar */}

        <div className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-[400px]">
              <Search
                size={20}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search category..."
                value={
                  searchTerm
                }
                onChange={(e) =>
                  setSearchTerm(
                    e.target
                      .value
                  )
                }
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              onClick={() =>
                setOpenCreateModal(
                  true
                )
              }
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
            >
              <Plus
                size={18}
              />

              Create Category
            </button>
          </div>
        </div>

        {/* Categories Table */}

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b">
            <FolderTree className="text-green-600" />

            <h2 className="font-bold text-xl">
              Category List
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left font-semibold">
                    Name
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Description
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.map(
                  (
                    category: any
                  ) => (
                    <tr
                      key={
                        category._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-medium">
                        {
                          category.name
                        }
                      </td>

                      <td className="p-4 text-slate-600">
                        {
                          category.description
                        }
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setEditingCategory(
                                category
                              )
                            }
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              setDeletingCategory(
                                category
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}

      {openCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl">
            <button
              onClick={() =>
                setOpenCreateModal(
                  false
                )
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold transition"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6">
              Create Category
            </h2>

            <CreateCategoryModal />
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {editingCategory && (
        <EditCategoryModal
          category={
            editingCategory
          }
          onClose={() =>
            setEditingCategory(
              null
            )
          }
        />
      )}

      {/* Delete Dialog */}

      {deletingCategory && (
        <DeleteCategoryDialog
          categoryId={
            deletingCategory._id
          }
          categoryName={
            deletingCategory.name
          }
          onClose={() =>
            setDeletingCategory(
              null
            )
          }
        />
      )}
    </>
  );
};

export default Categories;