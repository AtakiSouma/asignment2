import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongodb_url = process.env.MONGO_URL;
    if (!mongodb_url) {
      console.error("MongoDB connection URL is not provided.");
      process.exit(1);
    } else {
      await mongoose.connect("mongodb+srv://hoangnam1772004:01685835912nam@cluster0.6rbaew5.mongodb.net/SDN301m?retryWrites=true&w=majority", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error(`Error from MongoDB: ${error}`);
    process.exit(1);
  }
};

