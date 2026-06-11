import {
  Package,
  AlertTriangle,
  CheckCircle,
  Warehouse,
} from "lucide-react";

interface Props {
  products: any[];
}

const InventoryReportTable = ({
  products,
}: Props) => {
  const totalStock =
    products.reduce(
      (
        total: number,
        product: any
      ) =>
        total +
        (product.stock || 0),
      0
    );

  const totalInventoryValue =
    products.reduce(
      (
        total: number,
        product: any
      ) =>
        total +
        (product.stock || 0) *
          (product.purchasePrice ||
            0),
      0
    );

  const lowStockProducts =
    products.filter(
      (
        product: any
      ) =>
        product.stock <= 10
    );

  const getStockStatus = (
    stock: number
  ) => {
    if (stock <= 5) {
      return (
        <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
          <AlertTriangle
            size={14}
          />
          Critical
        </span>
      );
    }

    if (stock <= 10) {
      return (
        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
          <AlertTriangle
            size={14}
          />
          Low Stock
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
        <CheckCircle
          size={14}
        />
        In Stock
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Total Products
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {
                  products.length
                }
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Package className="text-blue-600 w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Total Stock Units
              </p>

              <h2 className="text-3xl font-bold mt-2 text-indigo-600">
                {totalStock}
              </h2>
            </div>

            <div className="bg-indigo-100 p-4 rounded-2xl">
              <Warehouse className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">
                Inventory Value
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                ৳
                {totalInventoryValue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <CheckCircle className="text-green-600 w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Inventory Report
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Current stock levels, inventory value and warehouse tracking
            </p>
          </div>

          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold">
            Products:
            {" "}
            {products.length}
          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Product
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  SKU
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Warehouse
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Stock
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Purchase Price
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Selling Price
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Inventory Value
                </th>

                <th className="px-6 py-4 text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {products.length >
              0 ? (
                products.map(
                  (
                    product: any
                  ) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-medium">
                        {
                          product.name
                        }
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {
                          product.sku
                        }
                      </td>

                      <td className="px-6 py-4">
                        {product.warehouse ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-4 font-bold">
                        {
                          product.stock
                        }
                      </td>

                      <td className="px-6 py-4">
                        ৳
                        {product.purchasePrice?.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        ৳
                        {product.sellingPrice?.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 font-bold text-green-600">
                        ৳
                        {(
                          product.stock *
                          product.purchasePrice
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        {getStockStatus(
                          product.stock
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-16 text-slate-500"
                  >
                    No inventory data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="border-t bg-slate-50 px-6 py-5">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-slate-500 text-sm">
                Total Products
              </p>

              <h3 className="text-2xl font-bold text-blue-600 mt-1">
                {
                  products.length
                }
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-slate-500 text-sm">
                Low Stock Items
              </p>

              <h3 className="text-2xl font-bold text-orange-600 mt-1">
                {
                  lowStockProducts.length
                }
              </h3>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-slate-500 text-sm">
                Inventory Worth
              </p>

              <h3 className="text-2xl font-bold text-green-600 mt-1">
                ৳
                {totalInventoryValue.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReportTable;