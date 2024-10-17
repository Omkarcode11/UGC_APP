import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from the environment variable or use a default value
const mongoURI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/omkar";

// Create a function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if there is a connection error
  }
};

// Optional: Add event listeners for MongoDB connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("MongoDB connection opened");
});
