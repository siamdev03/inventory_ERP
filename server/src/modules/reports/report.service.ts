import ExcelJS from "exceljs";

import { Purchase } from "../purchases/purchase.model";
import { Sale } from "../sales/sale.model";
import { Product } from "../products/product.model";

const getPurchaseReport = async (
  startDate?: string,
  endDate?: string
) => {
  const filter: any = {};

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const purchases = await Purchase.find(
    filter
  )
    .populate("supplier")
    .populate("product")
    .populate("warehouse")
    .sort({ createdAt: -1 });

  return purchases;
};

const getSalesReport = async (
  startDate?: string,
  endDate?: string
) => {
  const filter: any = {};

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const sales = await Sale.find(filter)
    .populate("product")
    .populate("warehouse")
    .sort({ createdAt: -1 });

  return sales;
};

const getStockReport = async () => {
  const products = await Product.find()
    .populate("category")
    .sort({ stock: 1 });

  return products;
};

const exportSalesExcel =
  async () => {
    const sales =
      await Sale.find()
        .populate("product")
        .populate("warehouse");

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet("Sales Report");

    worksheet.columns = [
      {
        header: "Product",
        key: "product",
        width: 30,
      },
      {
        header: "Warehouse",
        key: "warehouse",
        width: 30,
      },
      {
        header: "Quantity",
        key: "quantity",
        width: 15,
      },
      {
        header: "Selling Price",
        key: "sellingPrice",
        width: 20,
      },
      {
        header: "Total Amount",
        key: "totalAmount",
        width: 20,
      },
      {
        header: "Status",
        key: "status",
        width: 15,
      },
      {
        header: "Date",
        key: "date",
        width: 25,
      },
    ];

    sales.forEach((sale: any) => {
      worksheet.addRow({
        product:
          sale.product?.name ||
          "N/A",
        warehouse:
          sale.warehouse?.name ||
          "N/A",
        quantity:
          sale.quantity,
        sellingPrice:
          sale.sellingPrice,
        totalAmount:
          sale.totalAmount,
        status:
          sale.status,
        date:
          sale.createdAt,
      });
    });

    return workbook;
  };

export const ReportServices = {
  getPurchaseReport,
  getSalesReport,
  getStockReport,
  exportSalesExcel,
};