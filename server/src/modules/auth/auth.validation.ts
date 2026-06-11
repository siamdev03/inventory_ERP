import { z } from "zod";

export const registerValidationSchema =
  z.object({
    body: z.object({
      name: z.string(),

      email: z.string().email(),

      password: z
        .string()
        .min(6),

      role: z.string(),
    }),
  });