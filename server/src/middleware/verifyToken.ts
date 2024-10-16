// src/middlewares/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to check if the token is valid
export function verifyToken(req: Request, res: Response, next: NextFunction) {
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
  jwt.verify(actualToken, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // If the token is valid, store the decoded information (e.g., user ID) in request
    req.user = decoded; // You may need to define the user type in Request interface
    next(); // Proceed to the next middleware or route handler
  });
}
