"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        sku: zod_1.z.string(),
        barcode: zod_1.z.string().optional(),
        category: zod_1.z.string(),
        warehouse: zod_1.z.string(),
        purchasePrice: zod_1.z.number(),
        sellingPrice: zod_1.z.number(),
        stock: zod_1.z.number().optional(),
        unit: zod_1.z.string().optional(),
    }),
});
