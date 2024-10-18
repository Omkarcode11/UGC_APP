import mongoose, { Schema, Document } from "mongoose";
import { Campaign } from "./Campaign";
import { Application } from "./Application";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "BRAND" | "CREATOR";
  campaigns: mongoose.Types.ObjectId[];
  applications: mongoose.Types.ObjectId[];
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["BRAND", "CREATOR"],
      required: true,
    },
    campaigns: [{ type: Schema.Types.ObjectId, ref: "Campaign" }],
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
