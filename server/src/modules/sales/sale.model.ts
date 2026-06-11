import {
  Schema,
  model,
} from "mongoose";

import { ISale } from "./sale.interface";

const saleSchema =
  new Schema<ISale>(
    {
      customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: false,
      },

      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      warehouse: {
        type: Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      sellingPrice: {
        type: Number,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "completed",
          "cancelled",
        ],
        default: "completed",
      },

      saleDate: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const Sale = model<ISale>(
  "Sale",
  saleSchema
);