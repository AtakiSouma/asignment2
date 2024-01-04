import mongoose, { Schema, model } from "mongoose";
import { IUsers } from "./Validation/modelData";
import { Token } from "./Token";
// UserSchema
const userSchema = new Schema<IUsers>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model<IUsers>("User", userSchema);
