import { useState } from "react";

import {
  Plus,
  Search,
  Truck,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

import {
  useGetSuppliersQuery,
} from "@/redux/api/supplierApi";

import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";
import EditSupplierModal from "@/components/suppliers/EditSupplierModal";
import DeleteSupplierDialog from "@/components/suppliers/DeleteSupplierDialog";

const Suppliers = () => {
  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedSupplier,
    setSelectedSupplier,
  ] = useState<any>(null);

  const {
    data,
    isLoading,
    isError,
  } =
    useGetSuppliersQuery(
      undefined
    );

  if (isLoading) {
    return (
      <div className="p-8">
        Loading Suppliers...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load suppliers
      </div>
    );
  }

  const suppliers =
    data?.data?.filter(
      (supplier: any) =>
        supplier.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        supplier.companyName
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    ) || [];

  return (
    <>
      <div className="space-y-8">
        {/* Hero Section */}

        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                Suppliers
              </h1>

              <p className="text-orange-100 mt-2">
                Manage supplier
                relationships and
                procurement sources.
              </p>
            </div>

            <Truck
              size={70}
              className="opacity-30"
            />
          </div>
        </div>

        {/* Search + Create */}

        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search supplier..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={() =>
              setCreateOpen(true)
            }
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg transition"
          >
            <Plus size={18} />
            Create Supplier
          </button>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-5 text-left">
                    Supplier
                  </th>

                  <th className="p-5 text-left">
                    Company
                  </th>

                  <th className="p-5 text-left">
                    Email
                  </th>

                  <th className="p-5 text-left">
                    Phone
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>

                  <th className="p-5 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {suppliers.map(
                  (
                    supplier: any
                  ) => (
                    <tr
                      key={
                        supplier._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-orange-100 p-3 rounded-xl">
                            <Truck
                              size={
                                18
                              }
                              className="text-orange-600"
                            />
                          </div>

                          <span className="font-semibold">
                            {
                              supplier.name
                            }
                          </span>
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Building2
                            size={
                              16
                            }
                          />

                          {
                            supplier.companyName
                          }
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Mail
                            size={
                              16
                            }
                          />

                          {
                            supplier.email
                          }
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <Phone
                            size={
                              16
                            }
                          />

                          {
                            supplier.phone
                          }
                        </div>
                      </td>

                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            supplier.status ===
                            "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            supplier.status
                          }
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex flex-col md:flex-row gap-2">
                          <button
                            onClick={() => {
                              setSelectedSupplier(
                                supplier
                              );

                              setEditOpen(
                                true
                              );
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setSelectedSupplier(
                                supplier
                              );

                              setDeleteOpen(
                                true
                              );
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
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

      {createOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative">
            <button
              onClick={() =>
                setCreateOpen(false)
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold transition"
            >
              ×
            </button>

            <div className="p-8">
              <CreateSupplierModal
                onClose={() =>
                  setCreateOpen(false)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {editOpen &&
        selectedSupplier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative">
              <button
                onClick={() =>
                  setEditOpen(false)
                }
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold transition"
              >
                ×
              </button>

              <div className="p-8">
                <EditSupplierModal
                  supplier={
                    selectedSupplier
                  }
                  onClose={() =>
                    setEditOpen(false)
                  }
                />
              </div>
            </div>
          </div>
        )}

      {/* Delete Modal */}

      {deleteOpen &&
        selectedSupplier && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative">
              <button
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold transition"
              >
                ×
              </button>

              <div className="p-8">
                <DeleteSupplierDialog
                  id={
                    selectedSupplier._id
                  }
                  onClose={() =>
                    setDeleteOpen(false)
                  }
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Suppliers;