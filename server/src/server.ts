import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import campaignRoutes from "./routes/campaign.route";
import creatorRoutes from "./routes/creator.route";
import submissionRoutes from "./routes/submission.route";
import { connectDB } from "./config/config";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/creator", creatorRoutes);
app.use("/api/submission", submissionRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(5000, () => console.log("Server running on port 5000"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
