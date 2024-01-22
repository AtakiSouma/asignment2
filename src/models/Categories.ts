import mongoose, { Schema } from "mongoose";
import joi from "joi";

 export interface ICategories {
  name: string;
  slug: string;
  description: string;
  status: boolean;
}
const CategoriesSchema = new Schema<ICategories>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
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
  