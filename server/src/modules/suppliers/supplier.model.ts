import { Schema, model } from "mongoose";

import { ISupplier } from "./supplier.interface";

const supplierSchema =
  new Schema<ISupplier>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      companyName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export const Supplier =
  model<ISupplier>(
    "Supplier",
    supplierSchema
  );