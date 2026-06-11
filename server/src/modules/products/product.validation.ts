import { z } from "zod";

export const createProductSchema =
  z.object({
    body: z.object({
      name: z.string(),

      sku: z.string(),

      barcode:
        z.string().optional(),

      category: z.string(),

      warehouse: z.string(),

      purchasePrice:
        z.number(),

      sellingPrice:
        z.number(),

      stock:
        z.number().optional(),

      unit:
        z.string().optional(),
    }),
  });