import { Request, Response } from "express";
import { Campaign } from "../models/Campaign";
import { Application } from "../models/Application";
import { Submission } from "../models/Submission";

export const createCampaign = async (req: Request, res: Response) => {
  const { title, description, deadline, brandId } = req.body;
  const campaign = await Campaign.create({
    title,
    description,
    deadline,
    brandId,
  });
  res.json({ message: "Campaign created successfully", campaign });
};


export const applyCampaign = async (req:Request, res:Response) => {
    const { creatorId } = req.body;
    const campaignId = req.params.campaignId;
    const application = await Application.create({
      campaignId,
      creatorId,
      status: "PENDING",
    });
    res.json({ message: "Application submitted successfully", application });
  }


export const uploadContent = async (req:Request, res:Response) => {
    const { contentUrl, applicationId } = req.body;
    const submission = await Submission.create({
      contentUrl,
      applicationId,
      status: "PENDING",
    });
    res.json({ message: "Content submitted successfully", submission });
  }