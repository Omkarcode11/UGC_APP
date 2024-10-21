import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import { isBrand } from "../middleware/isBrand";
import { getAllCampaignSubmission, submission, updateSubmissionStatus } from "../controllers/submission.controller";
import { isCreator } from "../middleware/isCreator";

const router = Router();

// Upload the content (Creator)
router.post("/:applicationId", verifyToken, isCreator, submission);

// // Approved Content (Brand)
router.post("/updateSubmission/:submissionId", verifyToken, isBrand,updateSubmissionStatus);

//Get All Campaign Submission
router.get('/:campaignId',verifyToken,isBrand,getAllCampaignSubmission)

// //Change the Applicants Status
// router.post('/updateStatus/:id',verifyToken,isBrand,)

export default router;
