"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const Campaign_1 = require("../models/Campaign");
const Application_1 = require("../models/Application");
const Submission_1 = require("../models/Submission");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "omkar",
    database: "omkar",
    port: 5432,
    models: [User_1.User, Campaign_1.Campaign, Application_1.Application, Submission_1.Submission],
});
//# sourceMappingURL=config.js.map