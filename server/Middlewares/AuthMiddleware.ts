import { Request, Response } from "express";
import User from "../Models/UserModel"; 
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface JwtPayload {
  id: string;
}

export const userVerification = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY as string, async (err: any, decoded: any) => {
    const data = decoded as JwtPayload | undefined;
    if (err || !data) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) {
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false });
      }
    }
  });
};
