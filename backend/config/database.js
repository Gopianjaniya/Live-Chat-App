import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URI || process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URI is required");
    }

    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
