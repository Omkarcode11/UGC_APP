"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to check if the token is valid
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    // Extract the token part from the header
    const tokenParts = token.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return res.status(403).json({ message: "Invalid token format" });
    }
    const actualToken = tokenParts[1];
    // Verify the token
    jsonwebtoken_1.default.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        // If the token is valid, store the decoded information (e.g., user ID) in request
        req.user = decoded; // You may need to define the user type in Request interface
        next(); // Proceed to the next middleware or route handler
    });
}
//# sourceMappingURL=verifyToken.js.map