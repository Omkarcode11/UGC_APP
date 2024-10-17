import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  creatorId: mongoose.Types.ObjectId;
  campaignId: mongoose.Types.ObjectId;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: Date;
  submission: mongoose.Types.ObjectId;
}

// Create the Application schema
const ApplicationSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    submission: {
      type: Schema.Types.ObjectId,
      ref: "Submission",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
