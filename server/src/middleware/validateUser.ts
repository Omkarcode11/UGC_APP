import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Validation middleware for creating or updating a user
export const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a string."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid."),

  body("passwordHash")
    .notEmpty()
    .withMessage("Password hash is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("role")
    .notEmpty()
    .withMessage("Role is required.")
    .isIn(["BRAND", "CREATOR"])
    .withMessage('Role must be either "BRAND" or "CREATOR".'),

  // Custom middleware to check validation result
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
