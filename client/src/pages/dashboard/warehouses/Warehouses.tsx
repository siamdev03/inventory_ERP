import { useState } from "react";

import {
  Plus,
  Warehouse as WarehouseIcon,
  Search,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import CreateWarehouseModal from "@/components/warehouses/CreateWarehouseModal";
import EditWarehouseModal from "@/components/warehouses/EditWarehouseModal";
import DeleteWarehouseDialog from "@/components/warehouses/DeleteWarehouseDialog";

import {
  useGetWarehousesQuery,
} from "@/redux/api/warehouseApi";

const Warehouses = () => {
  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedWarehouse,
    setSelectedWarehouse,
  ] = useState<any>(null);

  const {
    data,
    isLoading,
    isError,
  } =
    useGetWarehousesQuery(
      undefined
    );

  if (isLoading) {
    return (
      <div className="p-8">
        Loading Warehouses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load warehouses
      </div>
    );
  }

  const warehouses =
    data?.data?.filter(
      (warehouse: any) =>
        warehouse.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    ) || [];

  return (
    <>
      <div className="space-y-8">
        {/* Hero Section */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                Warehouses
              </h1>

              <p className="text-blue-100 mt-2">
                Manage inventory
                storage locations
                and warehouse
                operations.
              </p>
            </div>

            <WarehouseIcon
              size={70}
              className="opacity-30"
            />
          </div>
        </div>

        {/* Search + Create */}

        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />

            <input
              type="text"
              placeholder="Search warehouse..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-3 border rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() =>
              setCreateOpen(true)
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg transition"
          >
            <Plus size={18} />
            Create Warehouse
          </button>
        </div>

        {/* Warehouse Table */}

        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-5 text-left">
                    Warehouse
                  </th>

                  <th className="p-5 text-left">
                    Code
                  </th>

                  <th className="p-5 text-left">
                    City
                  </th>

                  <th className="p-5 text-left">
                    Manager
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
                {warehouses.map(
                  (
                    warehouse: any
                  ) => (
                    <tr
                      key={
                        warehouse._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-3 rounded-xl">
                            <WarehouseIcon
                              size={
                                18
                              }
                              className="text-blue-600"
                            />
                          </div>

                          <span className="font-semibold">
                            {
                              warehouse.name
                            }
                          </span>
                        </div>
                      </td>

                      <td className="p-5 font-medium">
                        {
                          warehouse.code
                        }
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={
                              16
                            }
                          />

                          {
                            warehouse.city
                          }
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <User
                            size={
                              16
                            }
                          />

                          {
                            warehouse.managerName
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
                            warehouse.phone
                          }
                        </div>
                      </td>

                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            warehouse.status ===
                            "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            warehouse.status
                          }
                        </span>
                      </td>

                      <td className="p-5">
                        <div className="flex flex-col md:flex-row gap-2">
                          <button
                            onClick={() => {
                              setSelectedWarehouse(
                                warehouse
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
                              setSelectedWarehouse(
                                warehouse
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() =>
                setCreateOpen(false)
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold"
            >
              ×
            </button>

            <CreateWarehouseModal
              onClose={() =>
                setCreateOpen(false)
              }
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {editOpen &&
        selectedWarehouse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-3xl relative">
              <button
                onClick={() =>
                  setEditOpen(false)
                }
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold"
              >
                ×
              </button>

              <EditWarehouseModal
                warehouse={
                  selectedWarehouse
                }
                onClose={() =>
                  setEditOpen(false)
                }
              />
            </div>
          </div>
        )}

      {/* Delete Modal */}

      {deleteOpen &&
        selectedWarehouse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md relative">
              <button
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-2xl font-bold"
              >
                ×
              </button>

              <DeleteWarehouseDialog
                id={
                  selectedWarehouse._id
                }
                onClose={() =>
                  setDeleteOpen(false)
                }
              />
            </div>
          </div>
        )}
    </>
  );
};

export default Warehouses;