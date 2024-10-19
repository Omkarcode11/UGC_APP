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
exports.updateApplicationStatus = exports.getApplicants = exports.getMyCampaign = exports.uploadContent = exports.createCampaign = void 0;
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
            deadline: new Date(deadline),
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
                        id: doc._id,
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
const getApplicants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the campaign by ID and populate the 'applications' field
        const campaign = yield Campaign_1.Campaign.findById(id)
            .populate({
            path: "applications",
            select: "creatorId status",
            populate: {
                path: "creatorId",
                select: "name",
            },
        })
            .populate({
            path: "applications",
            populate: {
                path: "campaignId",
                select: "title description",
            },
        })
            .select("campaignId creatorId")
            .exec();
        // If campaign is not found, return a 404 error
        if (!campaign) {
            res.status(404).json({ message: "Campaign not found" });
            return;
        }
        // Send the populated applicants data as response
        res.status(200).json(campaign.applications);
    }
    catch (err) {
        // Proper error handling
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
            return;
        }
        else {
            res.status(500).json({ message: "An unexpected error occurred" });
            return;
        }
    }
});
exports.getApplicants = getApplicants;
const updateApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure id from params and status from body
        const { id } = req.params;
        const { status } = req.body;
        // Validate the input
        if (!id || !status) {
            res.status(400).json({
                message: "Invalid input. 'id' and 'status' are required.",
            });
            return;
        }
        // Update the application status in the database
        const application = yield Application_1.Application.findById(id);
        // Check if the application exists
        if (!application) {
            res.status(404).json({
                message: `Application with ID ${id} not found.`,
            });
            return;
        }
        //checking the pending status
        if (application.status != "PENDING") {
            res.status(400).json({
                message: "Application status Already Updated",
            });
            return;
        }
        application.status = status;
        yield application.save();
        // Return success response
        res.status(200).json({
            message: "Status updated successfully.",
        });
    }
    catch (error) {
        // Handle any unexpected errors
        console.error("Error updating application status:", error);
        res.status(500).json({
            message: "An error occurred while updating the status. Please try again later.",
            error: error.message || "Internal Server Error",
        });
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
//# sourceMappingURL=compaign.controller.js.map