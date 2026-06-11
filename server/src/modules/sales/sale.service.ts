import { Sale } from "./sale.model";
import { Product } from "../products/product.model";

const createSale = async (
  payload: any
) => {
  const product =
    await Product.findById(
      payload.product
    );

  if (!product) {
    throw new Error(
      "Product Not Found"
    );
  }

  if (
    product.stock <
    payload.quantity
  ) {
    throw new Error(
      "Insufficient Stock"
    );
  }

  const sale =
    await Sale.create(payload);

  await Product.findByIdAndUpdate(
    payload.product,
    {
      $inc: {
        stock:
          -payload.quantity,
      },
    }
  );

  return sale;
};

const getSales = async () => {
  const sales =
    await Sale.find()
      .populate("customer")
      .populate("product")
      .populate("warehouse");

  return sales;
};

const getSingleSale =
  async (id: string) => {
    const sale =
      await Sale.findById(id)
        .populate("customer")
        .populate("product")
        .populate("warehouse");

    return sale;
  };

export const SaleServices = {
  createSale,
  getSales,
  getSingleSale,
};