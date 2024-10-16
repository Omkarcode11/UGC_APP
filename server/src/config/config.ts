import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Campaign } from "../models/Campaign";
import { Application } from "../models/Application";
import { Submission } from "../models/Submission";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "omkar",
  database: "omkar",
  port: 5432,
  models: [User, Campaign, Application, Submission],
});
