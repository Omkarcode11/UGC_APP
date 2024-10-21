import { Router } from "express";

import {
  createCampaign,
  getApplicants,
  getMyCampaign,
  updateApplicationStatus,
} from "../controllers/campaign.controller";
import { verifyToken } from "../middleware/verifyToken";
import { isBrand } from "../middleware/isBrand";

const router = Router();

// Get My Campaign (Brand)
router.get("/", verifyToken, isBrand, getMyCampaign);

// Create Campaign (Brand)
router.post("/", verifyToken, isBrand, createCampaign);

//Get All Applicants
router.get('/applicants/:id',verifyToken,isBrand,getApplicants)

//Change the Applicants Status 
router.post('/updateStatus/:id',verifyToken,isBrand,updateApplicationStatus)


export default router;
