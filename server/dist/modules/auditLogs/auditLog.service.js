"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogServices = void 0;
const auditLog_model_1 = require("./auditLog.model");
const createAuditLog = async (userId, action, module, description) => {
    return await auditLog_model_1.AuditLog.create({
        userId,
        action,
        module,
        description,
    });
};
const getAuditLogs = async () => {
    return await auditLog_model_1.AuditLog.find().sort({
        createdAt: -1,
    });
};
exports.AuditLogServices = {
    createAuditLog,
    getAuditLogs,
};
