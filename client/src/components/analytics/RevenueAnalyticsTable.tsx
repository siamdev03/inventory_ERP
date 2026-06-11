interface Props {
  sales: any[];
}

const RevenueAnalyticsTable = ({
  sales,
}: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">
          Revenue Analytics
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              Qty
            </th>

            <th className="p-4 text-left">
              Revenue
            </th>
          </tr>
        </thead>

        <tbody>
          {sales.map(
            (sale: any) => (
              <tr
                key={
                  sale._id
                }
                className="border-t"
              >
                <td className="p-4">
                  {
                    sale
                      ?.product
                      ?.name
                  }
                </td>

                <td className="p-4">
                  {
                    sale.quantity
                  }
                </td>

                <td className="p-4 font-semibold text-green-600">
                  BDT{" "}
                  {sale.totalAmount?.toLocaleString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueAnalyticsTable;