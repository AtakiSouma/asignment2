import mongoose, { Schema, model } from "mongoose";
import { ICategories } from "./Validation/modelData";

const CategoriesSchema = new Schema<ICategories>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Categories = mongoose.model<ICategories>(
  "Categories",
  CategoriesSchema
);
