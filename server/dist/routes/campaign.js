"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compaign_controller_1 = require("../controllers/compaign.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const isBrand_1 = require("../middleware/isBrand");
const router = (0, express_1.Router)();
// Get My Campaign (Brand)
router.get("/", verifyToken_1.verifyToken, isBrand_1.isBrand, compaign_controller_1.getMyCampaign);
// Create Campaign (Brand)
router.post("/", verifyToken_1.verifyToken, isBrand_1.isBrand, compaign_controller_1.createCampaign);
// Apply to Campaign (Creator)
router.post("/:campaignId/apply", compaign_controller_1.applyCampaign);
// Upload UGC Content (Creator)
router.post("/:campaignId/submit", compaign_controller_1.applyCampaign);
exports.default = router;
//# sourceMappingURL=campaign.js.map