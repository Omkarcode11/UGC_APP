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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const campaign_1 = __importDefault(require("./routes/campaign"));
const creator_route_1 = __importDefault(require("./routes/creator.route"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/auth", auth_1.default);
app.use("/api/campaigns", campaign_1.default);
app.use("/api/creator", creator_route_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, config_1.connectDB)();
        app.listen(5000, () => console.log("Server running on port 5000"));
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
start();
//# sourceMappingURL=server.js.map