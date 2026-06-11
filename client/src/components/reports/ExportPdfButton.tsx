import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Download } from "lucide-react";

interface Props {
  sales: any[];
  purchases: any[];
}

const ExportPdfButton = ({
  sales,
  purchases,
}: Props) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Title

    doc.setFontSize(22);

    doc.text(
      "Inventory ERP Report",
      14,
      20
    );

    doc.setFontSize(11);

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      30
    );

    // Sales Section

    doc.setFontSize(16);

    doc.text(
      "Sales Report",
      14,
      45
    );

    autoTable(doc, {
      startY: 50,

      head: [
        [
          "Product",
          "Quantity",
          "Amount",
          "Status",
        ],
      ],

      body: sales.map(
        (sale) => [
          sale?.product
            ?.name || "-",

          sale.quantity,

          `BDT ${sale.totalAmount}`,

          sale.status,
        ]
      ),
    });

    const salesTableEnd =
      (
        doc as any
      ).lastAutoTable
        ?.finalY || 80;

    // Purchase Section

    doc.setFontSize(16);

    doc.text(
      "Purchase Report",
      14,
      salesTableEnd + 15
    );

    autoTable(doc, {
      startY:
        salesTableEnd + 20,

      head: [
        [
          "Product",
          "Quantity",
          "Amount",
          "Status",
        ],
      ],

      body: purchases.map(
        (purchase) => [
          purchase?.product
            ?.name || "-",

          purchase.quantity,

          `৳${purchase.totalAmount}`,

          purchase.status,
        ]
      ),
    });

    doc.save(
      `Inventory_Report_${Date.now()}.pdf`
    );
  };

  return (
    <button
      onClick={
        handleExportPDF
      }
      className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg"
    >
      <Download
        size={20}
      />

      Export Report
    </button>
  );
};

export default ExportPdfButton;