interface Props {
  products: any[];
}

const TopProductsTable = ({
  products,
}: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">
          Top Products
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-left">
              Product
            </th>

            <th className="p-4 text-left">
              SKU
            </th>

            <th className="p-4 text-left">
              Stock
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map(
            (product: any) => (
              <tr
                key={
                  product._id
                }
                className="border-t"
              >
                <td className="p-4">
                  {
                    product.name
                  }
                </td>

                <td className="p-4">
                  {
                    product.sku
                  }
                </td>

                <td className="p-4">
                  {
                    product.stock
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;