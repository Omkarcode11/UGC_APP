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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Get the MongoDB URI from the environment variable or use a default value
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/UGC";
// Create a function to connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to connect to MongoDB
        yield mongoose_1.default.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process if there is a connection error
    }
});
exports.connectDB = connectDB;
// Optional: Add event listeners for MongoDB connection
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});
mongoose_1.default.connection.once("open", () => {
    console.log("MongoDB connection opened");
});
//# sourceMappingURL=config.js.map