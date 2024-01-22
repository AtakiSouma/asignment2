import mongoose, { Schema } from "mongoose";

interface INations {
  name: string;
}

const NationsSchema = new Schema<INations>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Nations = mongoose.model<INations>("Nations", NationsSchema);
export default Nations;
