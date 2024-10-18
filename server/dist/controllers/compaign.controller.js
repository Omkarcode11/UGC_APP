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
exports.getMyCampaign = exports.uploadContent = exports.applyCampaign = exports.createCampaign = void 0;
const Application_1 = require("../models/Application");
const Submission_1 = require("../models/Submission");
const validation_1 = require("../utils/validation");
const Campaign_1 = require("../models/Campaign");
const User_1 = require("../models/User");
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, deadline } = req.body;
        let brand = yield User_1.User.findById(req.user.id);
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
        let isValid = (0, validation_1.isValidateCampaign)(obj);
        if (isValid) {
            res.status(400).json({ message: isValid });
            return;
        }
        const campaign = yield Campaign_1.Campaign.create({
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
        brand.campaigns.push(campaign._id);
        yield brand.save();
        res.json({ message: "Campaign created successfully", campaign });
        return;
    }
    catch (err) {
        if (err && err instanceof Error && err.message) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: err });
        }
    }
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
const getMyCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myCampaign = yield User_1.User.findById(req.user.id)
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
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: err });
        }
    }
    return;
});
exports.getMyCampaign = getMyCampaign;
//# sourceMappingURL=compaign.controller.js.map