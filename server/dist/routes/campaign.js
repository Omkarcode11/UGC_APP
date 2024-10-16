"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compaign_controller_1 = require("../controllers/compaign.controller");
const router = (0, express_1.Router)();
// Create Campaign (Brand)
router.post("/", compaign_controller_1.createCampaign);
// Apply to Campaign (Creator)
router.post("/:campaignId/apply", compaign_controller_1.applyCampaign);
// Upload UGC Content (Creator)
router.post("/:campaignId/submit", compaign_controller_1.applyCampaign);
exports.default = router;
//# sourceMappingURL=campaign.js.map