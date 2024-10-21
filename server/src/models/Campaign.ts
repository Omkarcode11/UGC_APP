import mongoose, { Schema, Document } from "mongoose";

// Define the User and Application schema references
import { User } from "./User";
import { Application } from "./Application";

export interface ICampaign extends Document {
  brandId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  deadline: Date;
  applications: mongoose.Types.ObjectId[];
  submissions: mongoose.Types.ObjectId[];
  
}

// Create the Campaign schema
const CampaignSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const Campaign = mongoose.model<ICampaign>("Campaign", CampaignSchema);
