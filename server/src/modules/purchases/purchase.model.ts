import { Schema, model } from "mongoose";

import { IPurchase } from "./purchase.interface";

const purchaseSchema =
  new Schema<IPurchase>(
    {
      supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
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

      purchasePrice: {
        type: Number,
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      purchaseDate: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "received",
        ],
        default: "received",
      },
    },
    {
      timestamps: true,
    }
  );

export const Purchase =
  model<IPurchase>(
    "Purchase",
    purchaseSchema
  );