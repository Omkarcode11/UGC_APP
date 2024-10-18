"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({ message: "No token provided" });
        return;
    }
    // Extract the token part from the header
    const tokenParts = token.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        res.status(403).json({ message: "Invalid token format" });
        return;
    }
    const actualToken = tokenParts[1];
    // Verify the token
    jsonwebtoken_1.default.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        // If decoded is of type JwtPayload or string, store it in req.user
        req.user = decoded; // Assign it to req.user based on your token payload type
        next(); // Proceed to the next middleware or route handler
    });
}
//# sourceMappingURL=verifyToken.js.map