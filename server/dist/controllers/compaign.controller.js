"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadContent = exports.applyCampaign = exports.createCampaign = void 0;
const Campaign_1 = require("../models/Campaign");
const Application_1 = require("../models/Application");
const Submission_1 = require("../models/Submission");
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, deadline, brandId } = req.body;
    const campaign = yield Campaign_1.Campaign.create({
        title,
        description,
        deadline,
        brandId,
    });
    res.json({ message: "Campaign created successfully", campaign });
});
exports.createCampaign = createCampaign;
const applyCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { creatorId } = req.body;
    const campaignId = req.params.campaignId;
    const application = yield Application_1.Application.create({
        campaignId,
        creatorId,
        status: "PENDING",
    });
    res.json({ message: "Application submitted successfully", application });
});
exports.applyCampaign = applyCampaign;
const uploadContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentUrl, applicationId } = req.body;
    const submission = yield Submission_1.Submission.create({
        contentUrl,
        applicationId,
        status: "PENDING",
    });
    res.json({ message: "Content submitted successfully", submission });
});
exports.uploadContent = uploadContent;
//# sourceMappingURL=compaign.controller.js.map