import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, passwordHash, role });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );

  res.json({ message: "User registered successfully", user, token });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );
  res.json({ message: "Login successful", token });
};
