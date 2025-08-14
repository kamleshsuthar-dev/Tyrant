import mongoose from "mongoose";
import logger from "./logger";
import { env } from "../config/env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info(`✅ Connected to the mongoDB database instance`)
  } catch (error) {
    logger.error(error, "❌ mongoDB connection error");
    process.exit(1);
  }
};