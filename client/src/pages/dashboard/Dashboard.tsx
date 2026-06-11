import { useState } from "react";

import {
  Package,
  Boxes,
  Warehouse,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

import { useGetDashboardQuery } from "@/redux/api/dashboardApi";

import CreateProductModal from "@/components/products/CreateProductModal";
import CreateCategoryModal from "@/components/categories/CreateCategoryModal";
import CreateWarehouseModal from "@/components/warehouses/CreateWarehouseModal";
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal";

const Dashboard = () => {
  const [productOpen, setProductOpen] =
    useState(false);

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const [warehouseOpen, setWarehouseOpen] =
    useState(false);

  const [supplierOpen, setSupplierOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
  } = useGetDashboardQuery(undefined);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading Dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">
        Failed to load dashboard
      </div>
    );
  }

  const dashboard =
    data?.data || {};

  const stats = [
    {
      title: "Products",
      value:
        dashboard.totalProducts,
      icon: Package,
    },
    {
      title: "Categories",
      value:
        dashboard.totalCategories,
      icon: Boxes,
    },
    {
      title: "Warehouses",
      value:
        dashboard.totalWarehouses,
      icon: Warehouse,
    },
    {
      title: "Suppliers",
      value:
        dashboard.totalSuppliers,
      icon: Users,
    },
    {
      title: "Customers",
      value:
        dashboard.totalCustomers,
      icon: Users,
    },
    {
      title: "Purchases",
      value:
        dashboard.totalPurchases,
      icon: ShoppingCart,
    },
    {
      title: "Sales",
      value:
        dashboard.totalSales,
      icon: DollarSign,
    },
    {
      title: "Stock",
      value:
        dashboard.totalStock,
      icon: TrendingUp,
    },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Welcome Section */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            Welcome Back!
          </h1>

          <p className="text-blue-100 text-lg">
            Monitor your Inventory,
            Sales, Purchases and
            Warehouse operations
            from one place.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.title
                  }
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-500">
                        {
                          item.title
                        }
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        {
                          item.value
                        }
                      </h2>
                    </div>

                    <div className="bg-blue-100 p-4 rounded-2xl">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setProductOpen(true)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition"
              >
                Create Product
              </button>

              <button
                onClick={() =>
                  setCategoryOpen(true)
                }
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition"
              >
                Create Category
              </button>

              <button
                onClick={() =>
                  setWarehouseOpen(
                    true
                  )
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 transition"
              >
                Create Warehouse
              </button>

              <button
                onClick={() =>
                  setSupplierOpen(
                    true
                  )
                }
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3 transition"
              >
                Create Supplier
              </button>
            </div>
          </div>

          {/* Alerts */}

          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="text-orange-500" />

              <h2 className="text-xl font-bold">
                Inventory Alerts
              </h2>
            </div>

            <div className="space-y-3">
              <div className="border rounded-xl p-3">
                Low Stock Products
              </div>

              <div className="border rounded-xl p-3">
                Pending Purchases
              </div>

              <div className="border rounded-xl p-3">
                Sales Overview
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}

      {productOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() =>
                setProductOpen(false)
              }
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>

            <CreateProductModal />
          </div>
        </div>
      )}

      {/* Category Modal */}

      {categoryOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl relative">
            <button
              onClick={() =>
                setCategoryOpen(false)
              }
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>

            <CreateCategoryModal />
          </div>
        </div>
      )}

      {/* Warehouse Modal */}

      {warehouseOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() =>
                setWarehouseOpen(
                  false
                )
              }
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>

            <CreateWarehouseModal
              onClose={() =>
                setWarehouseOpen(
                  false
                )
              }
            />
          </div>
        </div>
      )}

      {/* Supplier Modal */}

      {supplierOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() =>
                setSupplierOpen(
                  false
                )
              }
              className="absolute top-4 right-4 text-3xl"
            >
              ×
            </button>

            <CreateSupplierModal
              onClose={() =>
                setSupplierOpen(
                  false
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;