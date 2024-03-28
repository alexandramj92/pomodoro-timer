import express from "express";
import authRoutes from "../Routes/AuthRoute"; // Adjust the path as necessary
import taskRoutes from "../Routes/TaskRoutes"; // Adjust the path as necessary

const router = express.Router();

// Use the specific routes from each file
router.use("/", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
