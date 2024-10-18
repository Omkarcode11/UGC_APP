import { Router } from "express";

import {
  applyCampaign,
  createCampaign,
  getMyCampaign,
} from "../controllers/compaign.controller";
import { verifyToken } from "../middleware/verifyToken";
import { isBrand } from "../middleware/isBrand";

const router = Router();

// Get My Campaign (Brand)
router.get("/", verifyToken, isBrand, getMyCampaign);

// Create Campaign (Brand)
router.post("/", verifyToken, isBrand, createCampaign);

// Apply to Campaign (Creator)
router.post("/:campaignId/apply", applyCampaign);

// Upload UGC Content (Creator)
router.post("/:campaignId/submit", applyCampaign);

export default router;
