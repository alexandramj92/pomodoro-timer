import express, { Request, Response } from "express";
import { Signup, Login } from "../Controllers/AuthController";
import { userVerification } from "../Middlewares/AuthMiddleware";

const router = express.Router();

declare module "express" {
  interface Request {
    user?: any;
  }
}

router.post("/signup", Signup);
router.post("/login", Login);
// router.use(userVerification);

// router.post("/", res.json({}));
router.post("/", userVerification, async (req: Request, res: Response) => {
  res.json({ status: true, user: req?.user.username, id: req?.user._id });
});

export default router;
