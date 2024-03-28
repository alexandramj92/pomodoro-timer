import { Request, Response, NextFunction } from "express";
import User from "../Models/UserModel";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import "express";

declare module "express" {
  interface Request {
    user?: any;
    id?: any;
  }
}

dotenv.config();

interface JwtPayload {
  id: string;
}

export const userVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY as string
    ) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Attach user information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors (e.g., token expired)
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};
