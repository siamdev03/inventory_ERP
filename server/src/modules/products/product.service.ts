import { Product } from "./product.model";

import { AuditLogServices } from "../auditLogs/auditLog.service";

const createProduct = async (
  payload: any
) => {
  const product =
    await Product.create(payload);

  await AuditLogServices.createAuditLog(
    "SYSTEM",
    "CREATE",
    "PRODUCT",
    `Product Created: ${product.name}`
  );

  return product;
};

const getProducts = async (
  query: Record<string, any>
) => {
  const page =
    Number(query.page) || 1;

  const limit =
    Number(query.limit) || 10;

  const skip =
    (page - 1) * limit;

  const searchTerm =
    query.searchTerm || "";

  const category =
    query.category;

  const filter: any = {};

  if (searchTerm) {
    filter.name = {
      $regex: searchTerm,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const total =
    await Product.countDocuments(
      filter
    );

  const products =
    await Product.find(filter)
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: products,
  };
};

const getSingleProduct = async (
  id: string
) => {
  const product =
    await Product.findById(
      id
    ).populate("category");

  return product;
};

const updateProduct = async (
  id: string,
  payload: any
) => {
  const product =
    await Product.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category");

  if (product) {
    await AuditLogServices.createAuditLog(
      "SYSTEM",
      "UPDATE",
      "PRODUCT",
      `Product Updated: ${product.name}`
    );
  }

  return product;
};

const deleteProduct = async (
  id: string
) => {
  const product =
    await Product.findByIdAndDelete(
      id
    );

  if (product) {
    await AuditLogServices.createAuditLog(
      "SYSTEM",
      "DELETE",
      "PRODUCT",
      `Product Deleted: ${product.name}`
    );
  }

  return product;
};

const getLowStockProducts =
  async () => {
    const products =
      await Product.find({
        stock: {
          $lte: 5,
        },
      })
        .populate("category")
        .sort({
          stock: 1,
        });

    return products;
  };

export const ProductServices = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
};