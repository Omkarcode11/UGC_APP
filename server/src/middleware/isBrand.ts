import { NextFunction, Request, Response } from "express";

export const isBrand = (req: Request, res: Response, next: NextFunction) => {
  let role = req.user.role;
  
  if (role != "BRAND") {
    res.status(400).json({ message: "Invalid Authorization" });
  }

  next();
};
