import {
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface Props {
  sales: any[];
}

const SalesReportTable = ({
  sales,
}: Props) => {
  const getStatusBadge = (
    status: string
  ) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle size={14} />
            Completed
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

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Sales Report
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Detailed sales transaction records
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          Total Records:
          {" "}
          {sales.length}
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
                Quantity
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Unit Price
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Total
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
            {sales.length > 0 ? (
              sales.map(
                (
                  sale: any
                ) => (
                  <tr
                    key={
                      sale._id
                    }
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {
                        sale
                          ?.product
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {
                        sale
                          ?.product
                          ?.sku
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        sale
                          ?.warehouse
                          ?.name
                      }
                    </td>

                    <td className="px-6 py-4">
                      {
                        sale.quantity
                      }
                    </td>

                    <td className="px-6 py-4">
                      ৳
                      {sale.sellingPrice?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-bold text-green-600">
                      ৳
                      {sale.totalAmount?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(
                        sale.status
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(
                        sale.saleDate
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
                  colSpan={9}
                  className="text-center py-16 text-slate-500"
                >
                  No sales report found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex justify-between items-center px-6 py-4 border-t bg-slate-50">
        <p className="text-sm text-slate-500">
          Showing
          {" "}
          {sales.length}
          {" "}
          sales records
        </p>

        <div className="font-bold text-lg text-green-600">
          Revenue:
          {" "}
          ৳
          {sales
            .reduce(
              (
                total,
                sale
              ) =>
                total +
                sale.totalAmount,
              0
            )
            .toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SalesReportTable;