import { AuditLog } from "./auditLog.model";

const createAuditLog =
  async (
    userId: string,
    action: string,
    module: string,
    description: string
  ) => {
    return await AuditLog.create({
      userId,
      action,
      module,
      description,
    });
  };

const getAuditLogs =
  async () => {
    return await AuditLog.find().sort({
      createdAt: -1,
    });
  };

export const AuditLogServices = {
  createAuditLog,
  getAuditLogs,
};