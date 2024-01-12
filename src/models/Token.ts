import mongoose, { Schema, model } from "mongoose";
import { ITokens } from "./Validation/modelData";

// UserSchema
const tokenSchema = new Schema<ITokens>(
  {
    user: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
      unique:true,
    },
    token: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);
export const Token = mongoose.model<ITokens>("Token", tokenSchema);
