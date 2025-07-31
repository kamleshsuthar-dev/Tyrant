import mongoose from "mongoose";
import { env } from "config/env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB Connected Succesfully");
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
  }
};
