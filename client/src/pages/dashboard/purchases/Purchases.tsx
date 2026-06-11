import { useState } from "react";

import {
  Plus,
  Package,
  Warehouse,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";

import { useGetPurchasesQuery } from "@/redux/api/purchaseApi";

import CreatePurchaseModal from "@/components/purchases/CreatePurchaseModal";

const Purchases = () => {
  const [createOpen, setCreateOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const {
    data,
    isLoading,
    isError,
  } = useGetPurchasesQuery(
    undefined
  );

  if (isLoading) {
    return (
      <div className="p-8">
        Loading Purchases...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load purchases
      </div>
    );
  }

  const purchases =
    data?.data || [];

  const filteredPurchases =
    purchases.filter(
      (purchase: any) => {
        const matchesSearch =
          purchase?.product?.name
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          purchase?.product?.sku
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "all"
            ? true
            : purchase.status ===
              statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const totalAmount =
    purchases.reduce(
      (
        sum: number,
        purchase: any
      ) =>
        sum +
        (purchase.totalAmount ||
          0),
      0
    );

  const totalPending =
    purchases.filter(
      (p: any) =>
        p.status === "pending"
    ).length;

  const totalReceived =
    purchases.filter(
      (p: any) =>
        p.status === "received"
    ).length;

  return (
    <>
      <div className="space-y-8">
        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">
            Purchase Management
          </h1>

          <p className="text-blue-100 mt-2 text-lg">
            Manage procurement,
            suppliers and inventory
            purchases from one
            central dashboard.
          </p>
        </div>

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Purchases
            </h2>

            <p className="text-slate-500">
              Track and manage all
              purchase records
            </p>
          </div>

          <button
            onClick={() =>
              setCreateOpen(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition"
          >
            <Plus size={20} />
            Create Purchase
          </button>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
            <Package className="text-blue-600 mb-4" />

            <p className="text-slate-500">
              Total Purchases
            </p>

            <h2 className="text-4xl font-bold">
              {purchases.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
            <DollarSign className="text-green-600 mb-4" />

            <p className="text-slate-500">
              Total Amount
            </p>

            <h2 className="text-3xl font-bold">
              ৳
              {totalAmount.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
            <Warehouse className="text-amber-600 mb-4" />

            <p className="text-slate-500">
              Pending Orders
            </p>

            <h2 className="text-4xl font-bold">
              {totalPending}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">
            <Package className="text-indigo-600 mb-4" />

            <p className="text-slate-500">
              Received Orders
            </p>

            <h2 className="text-4xl font-bold">
              {totalReceived}
            </h2>
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col lg:flex-row justify-between gap-4">
          <div className="relative w-full lg:w-96">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Product or SKU..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <select
              value={
                statusFilter
              }
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="border rounded-xl pl-10 pr-6 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="received">
                Received
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-5 text-left">
                    Product
                  </th>

                  <th className="p-5 text-left">
                    SKU
                  </th>

                  <th className="p-5 text-left">
                    Quantity
                  </th>

                  <th className="p-5 text-left">
                    Price
                  </th>

                  <th className="p-5 text-left">
                    Total
                  </th>

                  <th className="p-5 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPurchases.length >
                0 ? (
                  filteredPurchases.map(
                    (
                      purchase: any
                    ) => (
                      <tr
                        key={
                          purchase._id
                        }
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-5 font-medium">
                          {
                            purchase
                              ?.product
                              ?.name
                          }
                        </td>

                        <td className="p-5 text-slate-600">
                          {
                            purchase
                              ?.product
                              ?.sku
                          }
                        </td>

                        <td className="p-5">
                          {
                            purchase.quantity
                          }
                        </td>

                        <td className="p-5">
                          ৳
                          {purchase.purchasePrice?.toLocaleString()}
                        </td>

                        <td className="p-5 font-bold">
                          ৳
                          {purchase.totalAmount?.toLocaleString()}
                        </td>

                        <td className="p-5">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              purchase.status ===
                              "received"
                                ? "bg-green-100 text-green-700"
                                : purchase.status ===
                                  "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {
                              purchase.status
                            }
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-slate-500"
                    >
                      No Purchase Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Purchase Modal */}

      {createOpen && (
        <CreatePurchaseModal
          onClose={() =>
            setCreateOpen(false)
          }
        />
      )}
    </>
  );
};

export default Purchases;