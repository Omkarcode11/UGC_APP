import { Request, Response } from "express";
import { Campaign } from "../models/Campaign";
import mongoose from "mongoose";
import { Application } from "../models/Application";
import { User } from "../models/User";

// Function to get campaigns with deadlines from tomorrow onwards
export const getAvailableCampaign = async (req: Request, res: Response) => {
  try {
    // Get today's date and set the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get tomorrow's date by adding 1 day to today's date
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Fetch campaigns where the deadline is tomorrow or later
    const campaigns = await Campaign.find({
      deadline: { $gte: tomorrow },
    }).select("title deadline description");

    res.status(200).json({
      success: true,
      data: campaigns,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message,
      });

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err,
    });
  }
  return;
};

export const getCampaignDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Ensure the provided ID is a valid MongoDB ObjectId
    if (!id || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid campaign ID format.",
      });
      return;
    }

    // Find campaign by ID and select relevant fields
    const campaign = await Campaign.findById(id).select(
      "title description deadline"
    );

    if (!campaign) {
      res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
      return;
    }

    // Return campaign data
    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (err: any) {
    // Catch any other unexpected errors
    res.status(500).json({
      success: false,
      message: "Server error occurred.",
      error: err.message,
    });
  }
  return;
};

export const applyCampaign = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const creatorId = req.user.id;
    const { campaignId } = req.params;

    // Validate if the creator exists
    const creator = await User.findById(creatorId);
    if (!creator) {
      res.status(404).json({ message: "Creator not found" });
      return;
    }

    // Check if the creator has already applied for this campaign
    if (
      creator.appliedCampaign.some(
        (id) => id.toString() === campaignId.toString()
      )
    ) {
      res
        .status(400)
        .json({ message: "You have already applied to this campaign" });
      return;
    }

    // Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // Create the application
    const application = await Application.create({
      campaignId,
      creatorId,
      text,
    });

    // Update creator and campaign with the new application
    creator.applications.push(application._id as mongoose.Types.ObjectId);
    creator.appliedCampaign.push(campaign._id as mongoose.Types.ObjectId);
    await creator.save();

    campaign.applications.push(application._id as mongoose.Types.ObjectId);
    await campaign.save();

    // Send success response
    res.json({
      message: "Application submitted successfully",
      application,
    });
    return;
  } catch (err) {
    // Improved error handling
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    res.status(500).json({ message: errorMessage });
    return;
  }
};

export const getAppliedCampaign = async (req: Request, res: Response) => {
  try {
    const creatorId = req.user.id;

    // Find the user and populate both 'applications' and 'campaignId' fields
    const creator = await User.findById(creatorId)
      .populate({
        path: "applications",
        select: "status", // Select only the status field from applications
        populate: [
          {
            path: "creatorId",
            select: "name", // Select only the creator's name
          },
          {
            path: "campaignId",
            select: "title description", // Select only the campaign's title and description
          },
        ],
      })// Exclude unnecessary fields

    if (!creator) {
      res.status(404).json({ message: "Creator not found" });
      return;
    }

    // Return the populated data
    res.json({ data: creator.applications });
    return;
  } catch (err) {
    // Error handling
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred";
    res.status(500).json({ message: errorMessage });
    return;
  }
};
