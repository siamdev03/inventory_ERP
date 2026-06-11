import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../users/user.model";

import { createToken } from "../../utils/createToken";
import AppError from "../../utils/AppError";

const registerUser = async (
  payload: any
) => {
  const user = await User.create(payload);

  return user;
};

const loginUser = async (
  payload: any
) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(
      404,
      "User Not Found"
    );
  }

  const matched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!matched) {
    throw new AppError(
      401,
      "Password Incorrect"
    );
  }

  const accessToken = createToken(
    {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    process.env.JWT_EXPIRES_IN as string
  );

  const refreshToken = createToken(
    {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET as string,
    process.env.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (
  token: string
) => {
  if (!token) {
    throw new AppError(
      401,
      "Refresh Token Required"
    );
  }

  const actualToken =
    token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

  const decoded = jwt.verify(
    actualToken,
    process.env.JWT_REFRESH_SECRET as string
  ) as any;

  const user = await User.findById(
    decoded.id
  );

  if (!user) {
    throw new AppError(
      404,
      "User Not Found"
    );
  }

  const newAccessToken = createToken(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    process.env.JWT_EXPIRES_IN as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
};