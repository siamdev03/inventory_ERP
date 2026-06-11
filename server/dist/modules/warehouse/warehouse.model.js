"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warehouse = void 0;
const mongoose_1 = require("mongoose");
const warehouseSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Warehouse = (0, mongoose_1.model)("Warehouse", warehouseSchema);
