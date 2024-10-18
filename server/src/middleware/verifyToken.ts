// src/middlewares/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
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
  jwt.verify(actualToken, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // If decoded is of type JwtPayload or string, store it in req.user
    req.user = decoded as JwtPayload; // Assign it to req.user based on your token payload type
    next(); // Proceed to the next middleware or route handler
  });
}
