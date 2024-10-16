import { Router } from "express";
import { Campaign } from "../models/Campaign";
import { Application } from "../models/Application";
import { Submission } from "../models/Submission";
import {
  applyCampaign,
  createCampaign,
} from "../controllers/compaign.controller";

const router = Router();

// Create Campaign (Brand)
router.post("/", createCampaign);

// Apply to Campaign (Creator)
router.post("/:campaignId/apply", applyCampaign);

// Upload UGC Content (Creator)
router.post("/:campaignId/submit", applyCampaign);

export default router;
