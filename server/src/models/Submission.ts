import mongoose, { Schema, Document } from 'mongoose';
import { Application } from './Application';

export interface ISubmission extends Document {
  applicationId: mongoose.Types.ObjectId;
  contentUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: Date;
}

// Create the Submission schema
const SubmissionSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    contentUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
