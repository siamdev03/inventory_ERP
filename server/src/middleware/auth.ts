import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import AppError from "../utils/AppError";

export const auth =
  (...roles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorizationToken =
      req.headers.authorization;

    if (!authorizationToken) {
      throw new AppError(
        401,
        "Unauthorized"
      );
    }

    const token =
      authorizationToken.startsWith(
        "Bearer "
      )
        ? authorizationToken.split(" ")[1]
        : authorizationToken;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    if (
      roles.length &&
      !roles.includes(decoded.role)
    ) {
      throw new AppError(
        403,
        "Forbidden"
      );
    }

    (req as any).user = decoded;

    next();
  };