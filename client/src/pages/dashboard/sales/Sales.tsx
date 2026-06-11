import { useState } from "react";

import {
  Plus,
  Search,
  Package,
  DollarSign,
  TrendingUp,
  Clock3,
} from "lucide-react";

import { useGetSalesQuery } from "@/redux/api/saleApi";

import CreateSaleModal from "@/components/sales/CreateSaleModal";

const Sales = () => {
  const [createOpen, setCreateOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const {
    data,
    isLoading,
    isError,
  } = useGetSalesQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading Sales...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load sales
      </div>
    );
  }

  const sales = data?.data || [];

  const totalRevenue =
    sales.reduce(
      (
        acc: number,
        sale: any
      ) =>
        acc +
        sale.totalAmount,
      0
    );

  const totalCompleted =
    sales.filter(
      (sale: any) =>
        sale.status ===
        "completed"
    ).length;

  const totalPending =
    sales.filter(
      (sale: any) =>
        sale.status ===
        "pending"
    ).length;

  const filteredSales =
    sales.filter(
      (sale: any) => {
        const matchesSearch =
          sale.product?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          status === "all"
            ? true
            : sale.status ===
              status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Sales
            </h1>

            <p className="text-slate-500 mt-2">
              Manage sales records
              and revenue tracking
            </p>
          </div>

          <button
            onClick={() =>
              setCreateOpen(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition"
          >
            <Plus size={20} />
            Create Sale
          </button>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <Package className="text-blue-600 mb-4" />

            <p className="text-slate-500">
              Total Sales
            </p>

            <h2 className="text-4xl font-bold">
              {sales.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <DollarSign className="text-green-600 mb-4" />

            <p className="text-slate-500">
              Revenue
            </p>

            <h2 className="text-3xl font-bold">
              ৳
              {totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <Clock3 className="text-yellow-500 mb-4" />

            <p className="text-slate-500">
              Pending Orders
            </p>

            <h2 className="text-4xl font-bold">
              {totalPending}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-6">
            <TrendingUp className="text-indigo-600 mb-4" />

            <p className="text-slate-500">
              Completed Orders
            </p>

            <h2 className="text-4xl font-bold">
              {totalCompleted}
            </h2>
          </div>
        </div>

        {/* Search & Filter */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-5 flex flex-col lg:flex-row gap-4 justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border border-slate-200 rounded-2xl px-4 py-3"
          >
            <option value="all">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Warehouse
                  </th>

                  <th className="p-4 text-left">
                    Quantity
                  </th>

                  <th className="p-4 text-left">
                    Price
                  </th>

                  <th className="p-4 text-left">
                    Total
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Sale Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredSales.map(
                  (sale: any) => (
                    <tr
                      key={
                        sale._id
                      }
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-semibold">
                            {
                              sale
                                ?.product
                                ?.name
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            SKU:
                            {
                              sale
                                ?.product
                                ?.sku
                            }
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        {
                          sale
                            ?.warehouse
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          sale.quantity
                        }
                      </td>

                      <td className="p-4">
                        ৳
                        {sale.sellingPrice}
                      </td>

                      <td className="p-4 font-semibold">
                        ৳
                        {
                          sale.totalAmount
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            sale.status ===
                            "completed"
                              ? "bg-green-100 text-green-700"
                              : sale.status ===
                                "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            sale.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          sale.saleDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {createOpen && (
        <CreateSaleModal
          onClose={() =>
            setCreateOpen(false)
          }
        />
      )}
    </>
  );
};

export default Sales;