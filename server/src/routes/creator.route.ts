import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { isCreator } from "../middleware/isCreator";
import { applyCampaign, getAppliedCampaign, getAvailableCampaign, getCampaignDetail } from "../controllers/creator.controller";

let router = express.Router();

//Get all Available Campaign
router.get("/campaign/available", verifyToken, isCreator, getAvailableCampaign);

//Get Campaign Details 
router.get("/campaign/detail/:id",verifyToken,isCreator,getCampaignDetail)

//Apply to the campaign
router.post("/:campaignId/apply", verifyToken,isCreator,applyCampaign)

//Get Applied Camping Details 
router.get('/applied',verifyToken,isCreator,getAppliedCampaign)

export default router;
