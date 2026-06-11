import { Product } from "../products/product.model";
import { Category } from "../categories/category.model";
import { Warehouse } from "../warehouse/warehouse.model";
import { Supplier } from "../suppliers/supplier.model";
import { Customer } from "../customers/customer.model";
import { Purchase } from "../purchases/purchase.model";
import { Sale } from "../sales/sale.model";

const getDashboardData = async () => {
  const totalProducts =
    await Product.countDocuments();

  const totalCategories =
    await Category.countDocuments();

  const totalWarehouses =
    await Warehouse.countDocuments();

  const totalSuppliers =
    await Supplier.countDocuments();

  const totalCustomers =
    await Customer.countDocuments();

  const totalPurchases =
    await Purchase.countDocuments();

  const totalSales =
    await Sale.countDocuments();

  const stockResult =
    await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: {
            $sum: "$stock",
          },
        },
      },
    ]);

  const totalStock =
    stockResult[0]?.totalStock || 0;

  return {
    totalProducts,
    totalCategories,
    totalWarehouses,
    totalSuppliers,
    totalCustomers,
    totalPurchases,
    totalSales,
    totalStock,
  };
};

export const DashboardServices = {
  getDashboardData,
};