"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidationSchema = void 0;
const zod_1 = require("zod");
exports.registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string()
            .min(6),
        role: zod_1.z.string(),
    }),
});
