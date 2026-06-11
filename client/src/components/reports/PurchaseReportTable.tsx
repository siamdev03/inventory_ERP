import {
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
} from "lucide-react";

interface Props {
  purchases: any[];
}

const PurchaseReportTable = ({
  purchases,
}: Props) => {
  const getStatusBadge = (
    status: string
  ) => {
    switch (status) {
      case "received":
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle size={14} />
            Received
          </span>
        );

      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Clock size={14} />
            Pending
          </span>
        );

      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
            <XCircle size={14} />
            Cancelled
          </span>
        );

      default:
        return (
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  const totalPurchaseAmount =
    purchases.reduce(
      (
        total: number,
        purchase: any
      ) =>
        total +
        (purchase.totalAmount || 0),
      0
    );

  const totalQuantity =
    purchases.reduce(
      (
        total: number,
        purchase: any
      ) =>
        total +
        (purchase.quantity || 0),
      0
    );

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingCart
              size={24}
            />
            Purchase Report
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Detailed purchase transactions and inventory procurement records
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          Total Records:
          {" "}
          {purchases.length}
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
                Supplier
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Quantity
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Unit Cost
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Total Cost
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {purchases.length >
            0 ? (
              purchases.map(
                (
                  purchase: any
                ) => (
                  <tr
                    key={
                      purchase._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {
                        purchase
                          ?.product
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {
                        purchase
                          ?.product
                          ?.sku
                      }
                    </td>

                    <td className="px-6 py-4">
                      {purchase
                        ?.warehouse
                        ?.name ||
                        "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {purchase
                        ?.supplier
                        ?.name ||
                        "N/A"}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {
                        purchase.quantity
                      }
                    </td>

                    <td className="px-6 py-4">
                      ৳
                      {purchase.purchasePrice?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-bold text-blue-600">
                      ৳
                      {purchase.totalAmount?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(
                        purchase.status
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(
                        purchase.purchaseDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-200 transition">
                        <Eye
                          size={16}
                        />
                        View
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-16 text-slate-500"
                >
                  No purchase report found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}

      <div className="border-t bg-slate-50 px-6 py-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Purchases
            </p>

            <h3 className="text-2xl font-bold text-blue-600 mt-1">
              {purchases.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Quantity
            </p>

            <h3 className="text-2xl font-bold text-indigo-600 mt-1">
              {totalQuantity}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Purchase Value
            </p>

            <h3 className="text-2xl font-bold text-green-600 mt-1">
              ৳
              {totalPurchaseAmount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseReportTable;