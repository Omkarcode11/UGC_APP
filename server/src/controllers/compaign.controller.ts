import { Request, Response } from "express";
import { Application } from "../models/Application";
import { Submission } from "../models/Submission";
import { isValidateCampaign } from "../utils/validation";
import { Campaign } from "../models/Campaign";
import { User } from "../models/User";
import mongoose from "mongoose";

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { title, description, deadline } = req.body;
    let brand = await User.findById(req.user.id);

    if (!brand) {
      res.status(400).json({
        message: "Brand not found ",
      });
      return;
    }

    let obj = {
      title: title.toString().trim(),
      description: description.toString().trim(),
      deadline: deadline.toString().trim(),
    };
    let isValid = isValidateCampaign(obj);

    if (isValid) {
      res.status(400).json({ message: isValid });
      return;
    }

    const campaign = await Campaign.create({
      title,
      description,
      deadline: new Date(deadline),
      brandId: req.user.id,
    });
    // console.log(campaign._id, "from contaofsdaf");

    if (!campaign._id) {
      res.status(500).json({
        message: "Unable to Create Campaign try again after some time ",
      });
      return;
    }

    if (!Array.isArray(brand.campaigns)) {
      brand.campaigns = [];
    }

    // Cast campaign._id as mongoose.Types.ObjectId
    brand.campaigns.push(campaign._id as mongoose.Types.ObjectId);
    await brand.save();

    res.json({ message: "Campaign created successfully", campaign });
    return;
  } catch (err) {
    if (err && err instanceof Error && err.message) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: err });
    }
  }
};

export const uploadContent = async (req: Request, res: Response) => {
  const { contentUrl, applicationId } = req.body;
  const submission = await Submission.create({
    contentUrl,
    applicationId,
    status: "PENDING",
  });
  res.json({ message: "Content submitted successfully", submission });
};

export const getMyCampaign = async (req: Request, res: Response) => {
  try {
    let myCampaign = await User.findById(req.user.id)
      .populate({
        path: "campaigns",
        select: "title deadline applications",
        transform: (doc) => {
          if (doc) {
            return {
              id: doc._id,
              title: doc.title,
              deadline: doc.deadline,
              applicationsCount: doc.applications.length,
            };
          }
          return doc;
        },
      })
      .select("campaigns");

    if (!myCampaign) {
      res.status(400).json({ message: "Campaigns not Found" });
      return;
    }

    res.json({ message: myCampaign });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: err });
    }
  }
  return;
};

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the campaign by ID and populate the 'applications' field
    const campaign = await Campaign.findById(id)
      .populate({
        path: "applications",
        select: "creatorId status",
        populate: {
          path: "creatorId",
          select: "name",
        },
      })
      .populate({
        path: "applications",
        populate: {
          path: "campaignId",
          select: "title description",
        },
      })
      .select("campaignId creatorId")
      .exec();

    // If campaign is not found, return a 404 error
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // Send the populated applicants data as response
    res.status(200).json(campaign.applications);
  } catch (err) {
    // Proper error handling
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
      return;
    }
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    // Destructure id from params and status from body
    const { id } = req.params;
    const { status } = req.body;

    // Validate the input
    if (!id || !status) {
      res.status(400).json({
        message: "Invalid input. 'id' and 'status' are required.",
      });
      return;
    }

    // Update the application status in the database
    const application = await Application.findById(id);

    // Check if the application exists
    if (!application) {
      res.status(404).json({
        message: `Application with ID ${id} not found.`,
      });
      return;
    }

    //checking the pending status
    if (application.status != "PENDING") {
      res.status(400).json({
        message: "Application status Already Updated",
      });
      return;
    }

    application.status = status;
    await application.save();

    // Return success response
    res.status(200).json({
      message: "Status updated successfully.",
    });
  } catch (error: any) {
    // Handle any unexpected errors
    console.error("Error updating application status:", error);
    res.status(500).json({
      message:
        "An error occurred while updating the status. Please try again later.",
      error: error.message || "Internal Server Error",
    });
  }
};
