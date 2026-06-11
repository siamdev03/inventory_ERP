import { Schema, model } from "mongoose";

import { IAuditLog } from "./auditLog.interface";

const auditLogSchema =
  new Schema<IAuditLog>(
    {
      userId: {
        type: String,
        required: true,
      },

      action: {
        type: String,
        required: true,
      },

      module: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const AuditLog =
  model<IAuditLog>(
    "AuditLog",
    auditLogSchema
  );