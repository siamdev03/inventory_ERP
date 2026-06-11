"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const mongoose_1 = require("mongoose");
const supplierSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Supplier = (0, mongoose_1.model)("Supplier", supplierSchema);
