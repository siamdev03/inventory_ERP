import { Types } from "mongoose";

export interface IProduct {
  name: string;

  sku: string;

  barcode?: string;

  category: Types.ObjectId;

  warehouse: string;

  purchasePrice: number;

  sellingPrice: number;

  stock: number;

  unit: string;

  status: "active" | "inactive";

  createdBy: string;
}