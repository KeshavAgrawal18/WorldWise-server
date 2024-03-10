import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

export default async function mongooseConnect() {
  if (!MONGODB_URL) {
    console.error("MongoDB URL not provided in environment variables.");
    process.exit(1); // Exit the process if MongoDB URL is not available
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", function () {
    console.log("Connected to MongoDB...");
  });
}
