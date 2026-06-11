import { Purchase } from "./purchase.model";
import { Product } from "../products/product.model";

const createPurchase = async (
  payload: any
) => {
  const purchase =
    await Purchase.create(payload);

  // Auto Stock Increase
  await Product.findByIdAndUpdate(
    payload.product,
    {
      $inc: {
        stock: payload.quantity,
      },
    },
    {
      new: true,
    }
  );

  return purchase;
};

const getPurchases = async () => {
  const purchases =
    await Purchase.find()
      .populate("supplier")
      .populate("product")
      .populate("warehouse");

  return purchases;
};

const getSinglePurchase =
  async (id: string) => {
    const purchase =
      await Purchase.findById(id)
        .populate("supplier")
        .populate("product")
        .populate("warehouse");

    return purchase;
  };

export const PurchaseServices = {
  createPurchase,
  getPurchases,
  getSinglePurchase,
};