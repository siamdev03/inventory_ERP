"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const mongoose_1 = require("mongoose");
const auditLogSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.AuditLog = (0, mongoose_1.model)("AuditLog", auditLogSchema);
