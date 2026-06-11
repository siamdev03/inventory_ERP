import { useState } from "react";

import {
  Search,
  Plus,
  Package,
} from "lucide-react";

import CreateProductModal from "@/components/products/CreateProductModal";
import EditProductModal from "@/components/products/EditProductModal";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";

import { useGetProductsQuery } from "@/redux/api/productApi";

const Products = () => {
  const [page, setPage] =
    useState(1);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    openCreateModal,
    setOpenCreateModal,
  ] = useState(false);

  const [
    editingProduct,
    setEditingProduct,
  ] = useState<any>(null);

  const [
    deletingProduct,
    setDeletingProduct,
  ] = useState<any>(null);

  const {
    data,
    isLoading,
    isError,
  } = useGetProductsQuery({
    page,
    limit: 10,
    searchTerm,
  });

  if (isLoading) {
    return (
      <div className="p-10">
        Loading Products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Failed to load products
      </div>
    );
  }

  const products =
    data?.data || [];

  const totalPages =
    Math.ceil(
      (data?.meta?.total ||
        0) /
        (data?.meta?.limit ||
          10)
    ) || 1;

  return (
    <>
      <div className="space-y-6">
        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold">
                Products
              </h1>

              <p className="text-blue-100 mt-2">
                Manage inventory
                products and stock
                levels from one
                place.
              </p>
            </div>

            <div className="bg-white/20 px-6 py-4 rounded-2xl">
              <p className="text-sm">
                Total Products
              </p>

              <h2 className="text-3xl font-bold">
                {
                  data?.meta
                    ?.total
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
                placeholder="Search product..."
                value={
                  searchTerm
                }
                onChange={(
                  e
                ) => {
                  setSearchTerm(
                    e.target
                      .value
                  );

                  setPage(
                    1
                  );
                }}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              onClick={() =>
                setOpenCreateModal(
                  true
                )
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
            >
              <Plus
                size={18}
              />

              Create Product
            </button>
          </div>
        </div>

        {/* Product Table */}

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b">
            <Package className="text-blue-600" />

            <h2 className="font-bold text-xl">
              Product List
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
                    SKU
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Stock
                  </th>

                  <th className="p-4 text-left font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (
                    product: any
                  ) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-medium">
                        {
                          product.name
                        }
                      </td>

                      <td className="p-4 text-slate-600">
                        {
                          product.sku
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
                            product.stock <=
                            5
                              ? "bg-red-100 text-red-600"
                              : product.stock <=
                                15
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {
                            product.stock
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setEditingProduct(
                                product
                              )
                            }
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              setDeletingProduct(
                                product
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

        {/* Pagination */}

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() =>
              setPage(
                page - 1
              )
            }
            disabled={
              page === 1
            }
            className="px-4 py-2 border rounded-xl disabled:opacity-50 hover:bg-slate-100"
          >
            Prev
          </button>

          <div className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Page {page}
          </div>

          <button
            onClick={() =>
              setPage(
                page + 1
              )
            }
            disabled={
              page >=
              totalPages
            }
            className="px-4 py-2 border rounded-xl disabled:opacity-50 hover:bg-slate-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* Create Product Modal */}

      {openCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-5xl relative shadow-2xl">
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
              Create Product
            </h2>

            <CreateProductModal />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}

      {editingProduct && (
        <EditProductModal
          product={
            editingProduct
          }
          onClose={() =>
            setEditingProduct(
              null
            )
          }
        />
      )}

      {/* Delete Dialog */}

      {deletingProduct && (
        <DeleteProductDialog
          productId={
            deletingProduct._id
          }
          productName={
            deletingProduct.name
          }
          onClose={() =>
            setDeletingProduct(
              null
            )
          }
        />
      )}
    </>
  );
};

export default Products;