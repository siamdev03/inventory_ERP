import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "admin",
        "manager",
        "staff",
      ],
      default: "staff",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  async function () {
    if (
      !this.isModified("password")
    ) {
      return;
    }

    this.password =
      await bcrypt.hash(
        this.password,
        10
      );
  }
);

export const User = model(
  "User",
  userSchema
);