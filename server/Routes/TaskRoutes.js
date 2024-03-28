"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const TaskController_1 = require("../Controllers/TaskController");
const router = express_1.default.Router();
// Middleware applied to all subsequent routes
router.use(AuthMiddleware_1.userVerification);
router.post("/user/:userId/task", TaskController_1.CreateTask);
router.get("/user/:userId/tasks", TaskController_1.GetTasks);
router.patch("/task/:taskId", TaskController_1.UpdateTask);
router.delete("/task/:taskId", TaskController_1.DeleteTask);
exports.default = router;
