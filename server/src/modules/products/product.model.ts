import mongoose, {
  Schema,
  model,
} from "mongoose";

import { IProduct } from "./product.interface";

const productSchema =
  new Schema<IProduct>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      sku: {
        type: String,
        required: true,
        unique: true,
      },

      barcode: {
        type: String,
      },

      category: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      warehouse: {
        type: String,
        required: true,
      },

      purchasePrice: {
        type: Number,
        required: true,
      },

      sellingPrice: {
        type: Number,
        required: true,
      },

      stock: {
        type: Number,
        default: 0,
      },

      unit: {
        type: String,
        default: "pcs",
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },

      createdBy: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Product =
  model<IProduct>(
    "Product",
    productSchema
  );