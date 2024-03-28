import express from "express";
import { userVerification } from "../Middlewares/AuthMiddleware";
import {
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
} from "../Controllers/TaskController";

const router = express.Router();

// Middleware applied to all subsequent routes
router.use(userVerification);

router.post("/user/:userId/task", CreateTask);
router.get("/user/:userId/tasks", GetTasks);
router.patch("/task/:taskId", UpdateTask);
router.delete("/task/:taskId", DeleteTask);
export default router;
