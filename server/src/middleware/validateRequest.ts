import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: ZodSchema) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  };

export default validateRequest;