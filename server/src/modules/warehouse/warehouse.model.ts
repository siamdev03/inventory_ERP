import { Schema, model } from "mongoose";

import { IWarehouse } from "./warehouse.interface";

const warehouseSchema =
  new Schema<IWarehouse>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      code: {
        type: String,
        required: true,
        unique: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      managerName: {
        type: String,
        required: true,
      },

      phone: {
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

export const Warehouse =
  model<IWarehouse>(
    "Warehouse",
    warehouseSchema
  );