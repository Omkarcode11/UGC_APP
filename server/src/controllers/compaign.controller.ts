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
      deadline,
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

export const applyCampaign = async (req: Request, res: Response) => {
  const { creatorId } = req.body;
  const campaignId = req.params.campaignId;
  const application = await Application.create({
    campaignId,
    creatorId,
    status: "PENDING",
  });
  res.json({ message: "Application submitted successfully", application });
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
