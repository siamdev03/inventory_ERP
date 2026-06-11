import mongoose from "mongoose";

export interface ISale {
  customer: mongoose.Types.ObjectId;

  product: mongoose.Types.ObjectId;

  warehouse: mongoose.Types.ObjectId;

  quantity: number;

  sellingPrice: number;

  totalAmount: number;

  status:
    | "pending"
    | "completed"
    | "cancelled";

  saleDate: Date;
}