import { NextFunction, Request, Response } from "express";

export const isCreator = (req: Request, res: Response, next: NextFunction) => {
  let role = req.user.role;
 
  if (role != "CREATOR") {
    res.status(400).json({ message: "Invalid Authorization" });
    return
  }

  next();
};
