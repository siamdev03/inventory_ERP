import mongoose from "mongoose";

export interface IPurchase {
  supplier: mongoose.Types.ObjectId;

  product: mongoose.Types.ObjectId;

  warehouse: mongoose.Types.ObjectId;

  quantity: number;

  purchasePrice: number;

  totalAmount: number;

  status:
    | "pending"
    | "received"
    | "cancelled";

  purchaseDate: Date;
}