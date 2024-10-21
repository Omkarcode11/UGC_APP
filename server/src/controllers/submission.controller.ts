import { Response, Request } from "express";
import { Application } from "../models/Application";
import { Submission } from "../models/Submission";
import { Campaign } from "../models/Campaign";
import mongoose from "mongoose";
import { populate } from "dotenv";

export const submission = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const { contentUrl } = req.body;

    // Validate if `contentUrl` is present
    if (!contentUrl || !contentUrl.trim()) {
      res.status(400).json({ message: "Content URL is required" });
      return;
    }

    // Find the application by ID
    const application = await Application.findById(applicationId);

    // If application is not found
    if (!application) {
      res.status(404).json({ message: "Application not found" });
      return;
    }

    // Check application status
    if (application.status !== "APPROVED") {
      res.status(400).json({
        message: `Application status is ${application.status}. Submission failed.`,
      });
      return;
    }

    if (application.creatorId != req.user.id) {
      res.status(400).json({
        message: `Unauthorized. Submission failed.`,
      });
      return;
    }

    let campaign = await Campaign.findById(application.campaignId);

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // Check if submission already exists for the application
    const existingSubmission = await Submission.findOne({ applicationId });

    if (existingSubmission) {
      res.status(400).json({ message: "You have already applied" });
      return;
    }

    // Create a new submission
    let submission = await Submission.create({ contentUrl, applicationId });

    campaign.submissions.push(submission._id as mongoose.Types.ObjectId);
    await campaign.save();

    // Return success response
    res.status(200).json({ message: "Submission successful" });
    return;
  } catch (error: any) {
    // Catch any unexpected errors
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  return;
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { status, feedback } = req.body;

    // Validate if status is provided
    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }

    // Update the submission status using `findOneAndUpdate`
    const updatedSubmission = await Submission.findOneAndUpdate(
      { _id: submissionId },
      { status, feedback },
      { new: true } // Return the updated document
    );

    // Check if the submission exists
    if (!updatedSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    // Return success response with the updated submission
    res.status(200).json({
      message: "Submission status updated successfully",
      submission: updatedSubmission,
    });
  } catch (error: any) {
    // Catch and log unexpected errors
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
  return;
};

export const getAllCampaignSubmission = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;

    // Validate campaignId
    if (!campaignId) {
      res.status(400).json({ message: "Campaign ID is required" });
      return;
    }

    // Fetch campaign submissions with optimized population
    const campaign = await Campaign.findById(campaignId)
      .select("submissions status")
      .populate({
        path: "submissions",
        select: "applicationId status submittedAt contentUrl",
        populate: {
          path: "applicationId",
          select: "creatorId status",
          populate: {
            path: "creatorId",
            select: "name",
          },
        },
      });

    // Check if campaign exists
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    res.status(200).json({ campaign });
    return;
  } catch (error) {
    console.error("Error fetching campaign submissions:", error);
    res.status(500).json({ message: "Server error", error });
    return;
  }
};
