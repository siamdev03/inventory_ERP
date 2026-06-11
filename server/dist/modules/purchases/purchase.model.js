"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
const purchaseSchema = new mongoose_1.Schema({
    supplier: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    warehouse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: [
            "pending",
            "received",
        ],
        default: "received",
    },
}, {
    timestamps: true,
});
exports.Purchase = (0, mongoose_1.model)("Purchase", purchaseSchema);
