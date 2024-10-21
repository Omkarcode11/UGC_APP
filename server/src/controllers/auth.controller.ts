import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, passwordHash, role });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!
    );

    res.json({ message: "User registered successfully", user, token });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
    else res.status(500).json({ message: err });
    return;
  }
};

export const login = async (req: any, res: any) => {
  let { email, password, role } = req.body;
  email = email.trim();
  password = password.trim();
  if (!email || !email.length)
    return res.status(400).json({ message: "Invalid mail" });
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "User not found Please try again with different mail" });
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
  if (role != user.role)
    return res.status(400).json({ message: "Role is invalid" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );
  res.json({ message: "Login successful", token});
};
