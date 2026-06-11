import jwt from "jsonwebtoken";

type TJwtPayload = {
  id: string;
  email: string;
  role: string;
};

export const createToken = (
  payload: TJwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(
    payload,
    secret,
    {
      expiresIn:
        expiresIn as jwt.SignOptions["expiresIn"],
    }
  );
};