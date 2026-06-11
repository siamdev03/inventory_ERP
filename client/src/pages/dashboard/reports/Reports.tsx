import { useState } from "react";

import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Package,
  Download,
  Calendar,
} from "lucide-react";

import { useGetSalesQuery } from "@/redux/api/saleApi";
import { useGetPurchasesQuery } from "@/redux/api/purchaseApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useGetCustomersQuery } from "@/redux/api/customerApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const Reports = () => {
  const [reportType, setReportType] =
    useState("sales");

  const {
    data: salesData,
  } = useGetSalesQuery(undefined);

  const {
    data: purchaseData,
  } = useGetPurchasesQuery(undefined);

  const {
    data: productData,
  } = useGetProductsQuery({
    page: 1,
    limit: 1000,
  });

  const {
    data: customerData,
  } = useGetCustomersQuery(undefined);

  const sales =
    salesData?.data || [];

  const purchases =
    purchaseData?.data || [];

  const products =
    productData?.data || [];

  const customers =
    customerData?.data || [];

  const totalRevenue =
    sales.reduce(
      (
        total: number,
        sale: any
      ) =>
        total +
        (sale.totalAmount || 0),
      0
    );

  const totalPurchase =
    purchases.reduce(
      (
        total: number,
        purchase: any
      ) =>
        total +
        (purchase.totalAmount ||
          0),
      0
    );

  const inventoryValue =
    products.reduce(
      (
        total: number,
        product: any
      ) =>
        total +
        product.stock *
          product.purchasePrice,
      0
    );
    const handleExportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Inventory ERP Report",
    14,
    20
  );

  doc.setFontSize(10);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  doc.setFontSize(14);

doc.text(
  `Total Revenue : BDT ${totalRevenue.toLocaleString()}`,
  14,
  40
);

doc.text(
  `Total Purchase : BDT ${totalPurchase.toLocaleString()}`,
  14,
  48
);

doc.text(
  `Inventory Value : BDT ${inventoryValue.toLocaleString()}`,
  14,
  56
);

  autoTable(doc, {
    startY: 70,

    head: [
      [
        "Product",
        "Quantity",
        "Amount",
        "Status",
      ],
    ],

    body: sales.map(
      (sale: any) => [
        sale?.product?.name,
        sale.quantity,
        sale.totalAmount,
        sale.status,
      ]
    ),
  });

  const finalY =
    (doc as any)
      .lastAutoTable
      ?.finalY || 90;

  autoTable(doc, {
    startY: finalY + 15,

    head: [
      [
        "Product",
        "Quantity",
        "Amount",
        "Status",
      ],
    ],

    body: purchases.map(
      (
        purchase: any
      ) => [
        purchase?.product
          ?.name,
        purchase.quantity,
        purchase.totalAmount,
        purchase.status,
      ]
    ),
  });

  doc.save(
    `Inventory_Report_${Date.now()}.pdf`
  );
};
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Reports Center
          </h1>

          <p className="text-slate-500 mt-2">
            Business Insights &
            Analytics Dashboard
          </p>
        </div>

<div className="flex gap-3">
  <button className="flex items-center gap-2 bg-white border px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition">
    <Calendar size={18} />

    Date Filter
  </button>
  <button
    onClick={handleExportPDF}
    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition"
  >
    <Download size={18} />
    Export Report
  </button>
</div>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                ৳
                {totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <DollarSign className="text-green-600 w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Purchases
              </p>

              <h2 className="text-3xl font-bold mt-2 text-blue-600">
                ৳
                {totalPurchase.toLocaleString()}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <ShoppingCart className="text-blue-600 w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Products
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {
                  products.length
                }
              </h2>
            </div>

            <div className="bg-indigo-100 p-4 rounded-2xl">
              <Package className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">
                Customers
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {
                  customers.length
                }
              </h2>
            </div>

            <div className="bg-orange-100 p-4 rounded-2xl">
              <BarChart3 className="text-orange-600 w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Value Card */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl">
        <h3 className="text-lg opacity-90">
          Current Inventory
          Value
        </h3>

        <h2 className="text-5xl font-bold mt-2">
          ৳
          {inventoryValue.toLocaleString()}
        </h2>

        <p className="opacity-80 mt-3">
          Total value of
          products currently in
          stock.
        </p>
      </div>

      {/* Report Switcher */}

      <div className="bg-white rounded-3xl shadow-md p-3 flex flex-wrap gap-3">
        <button
          onClick={() =>
            setReportType(
              "sales"
            )
          }
          className={`px-5 py-3 rounded-2xl font-medium transition ${
            reportType ===
            "sales"
              ? "bg-blue-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Sales Report
        </button>

        <button
          onClick={() =>
            setReportType(
              "purchases"
            )
          }
          className={`px-5 py-3 rounded-2xl font-medium transition ${
            reportType ===
            "purchases"
              ? "bg-blue-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Purchase Report
        </button>

        <button
          onClick={() =>
            setReportType(
              "inventory"
            )
          }
          className={`px-5 py-3 rounded-2xl font-medium transition ${
            reportType ===
            "inventory"
              ? "bg-blue-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Inventory Report
        </button>
      </div>

      {/* Report Table */}

      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {reportType ===
              "sales" &&
              "Sales Report"}

            {reportType ===
              "purchases" &&
              "Purchase Report"}

            {reportType ===
              "inventory" &&
              "Inventory Report"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              {reportType ===
                "sales" && (
                <tr>
                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Qty
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>
                </tr>
              )}

              {reportType ===
                "purchases" && (
                <tr>
                  <th className="p-4 text-left">
                    Product
                  </th>

                  <th className="p-4 text-left">
                    Qty
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>
                </tr>
              )}

              {reportType ===
                "inventory" && (
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

                  <th className="p-4 text-left">
                    Purchase Price
                  </th>

                  <th className="p-4 text-left">
                    Selling Price
                  </th>
                </tr>
              )}
            </thead>

            <tbody>
              {reportType ===
                "sales" &&
                sales.map(
                  (
                    sale: any
                  ) => (
                    <tr
                      key={
                        sale._id
                      }
                      className="border-t hover:bg-slate-50"
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
                        ৳
                        {sale.totalAmount?.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          {
                            sale.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}

              {reportType ===
                "purchases" &&
                purchases.map(
                  (
                    purchase: any
                  ) => (
                    <tr
                      key={
                        purchase._id
                      }
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {
                          purchase
                            ?.product
                            ?.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          purchase.quantity
                        }
                      </td>

                      <td className="p-4 font-semibold text-blue-600">
                        ৳
                        {purchase.totalAmount?.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {
                            purchase.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}

              {reportType ===
                "inventory" &&
                products.map(
                  (
                    product: any
                  ) => (
                    <tr
                      key={
                        product._id
                      }
                      className="border-t hover:bg-slate-50"
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

                      <td className="p-4">
                        ৳
                        {
                          product.purchasePrice
                        }
                      </td>

                      <td className="p-4">
                        ৳
                        {
                          product.sellingPrice
                        }
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;