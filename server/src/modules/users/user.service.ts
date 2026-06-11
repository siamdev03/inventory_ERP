import AppError from "../../utils/AppError";
import { User } from "./user.model";

const getUsers = async () => {
  const users = await User.find();

  return users;
};

const getSingleUser = async (
  id: string
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "User Not Found"
    );
  }

  return user;
};

const updateUser = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const user =
    await User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!user) {
    throw new AppError(
      404,
      "User Not Found"
    );
  }

  return user;
};

const deleteUser = async (
  id: string
) => {
  const user =
    await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError(
      404,
      "User Not Found"
    );
  }

  return null;
};

export const UserServices = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};