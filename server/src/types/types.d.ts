// src/types/express/index.d.ts (or types.d.ts)

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Customize this type based on your JWT payload
    }
  }
}
