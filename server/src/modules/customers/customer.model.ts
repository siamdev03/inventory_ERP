import { Schema, model } from "mongoose";

import { ICustomer } from "./customer.interface";

const customerSchema =
  new Schema<ICustomer>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
      },

      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export const Customer = model<ICustomer>(
  "Customer",
  customerSchema
);