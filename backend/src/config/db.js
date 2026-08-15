import mongoose from "mongoose";
import env from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};
