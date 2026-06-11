interface DataTableProps {
  columns: string[];
  data: Record<string, any>[];
}

const DataTable = ({
  columns,
  data,
}: DataTableProps) => {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            {columns.map(
              (column) => (
                <th
                  key={column}
                  className="text-left p-3 border-b font-semibold capitalize"
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map(
              (
                row,
                index
              ) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  {columns.map(
                    (
                      column
                    ) => (
                      <td
                        key={
                          column
                        }
                        className="p-3"
                      >
                        {row[
                          column
                        ] ??
                          "-"}
                      </td>
                    )
                  )}
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan={
                  columns.length
                }
                className="text-center p-6 text-slate-500"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;