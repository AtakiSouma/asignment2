import mongoose, { Schema } from "mongoose";
import { ICategories } from "./Categories"
// gacha game revenue
interface IOrchids {
  name: string;
  status: boolean;
  slug: string;
  image: string;
  background: string;
  nation: string;
  revenue: number;
  rating: number;
  development: string;
  category: mongoose.Types.ObjectId | ICategories;
  release_date: Date;
}

const OrchidSchema = new Schema<IOrchids>(
  {
    name: { type: String, required: [true, "Name is required"] },
    status: { type: Boolean, required: true, default: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: [true, "Image is required"] },
    background: { type: String, required: [true, "Background is required"] },
    nation: { type: String, required: [true, "Nation is required"] },
    revenue: { type: Number, required: [true, "Revenue is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
    development: { type: String, required: [true, "Development is required"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref:"Categories", required: [true, "Category is required"] },
    release_date: { type: Date, required: [true, "Release Date is required"] },
  },
  {
    timestamps: true,
  }
);

export const Orchids = mongoose.model<IOrchids>("Orchids", OrchidSchema);
