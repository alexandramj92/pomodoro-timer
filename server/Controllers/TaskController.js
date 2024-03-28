"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = exports.GetTasks = exports.UpdateTask = exports.CreateTask = void 0;
const TaskModel_1 = __importDefault(require("../Models/TaskModel"));
const CreateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, content, sortOrder } = req.body;
        const { userId } = req.params;
        const task = yield TaskModel_1.default.create({ status, content, sortOrder, userId });
        res
            .status(201)
            .json({ message: "Task was created successfully", success: true, task });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.CreateTask = CreateTask;
const UpdateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, content, sortOrder } = req.body;
        const { taskId } = req.params;
        // Find the task by ID and update it
        const updatedTask = yield TaskModel_1.default.findByIdAndUpdate(taskId, { status, content, sortOrder }, { new: true });
        // Check if the task was found and updated
        if (!updatedTask) {
            return res
                .status(404)
                .json({ message: "Task not found", success: false });
        }
        res.status(200).json({
            message: "Task was updated successfully",
            success: true,
            task: updatedTask,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.UpdateTask = UpdateTask;
const GetTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const tasks = yield TaskModel_1.default.find({ userId });
        res
            .status(200)
            .json({ message: "Tasks retrieved successfully", success: true, tasks });
        next();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.GetTasks = GetTasks;
const DeleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const task = yield TaskModel_1.default.deleteOne({ _id: taskId });
        if (task.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found", success: false });
        }
        res
            .status(200)
            .json({ message: "Task deleted successfully", success: true, _id: taskId });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.DeleteTask = DeleteTask;
