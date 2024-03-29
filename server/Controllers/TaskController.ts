import { Request, Response, NextFunction } from "express";
import Task from "../Models/TaskModel";

export const CreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, content, sortOrder } = req.body;
    const { userId } = req.params;
    const task = await Task.create({ status, content, sortOrder, userId });
    res
      .status(201)
      .json({ message: "Task was created successfully", success: true, task });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const UpdateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, content, sortOrder } = req.body;
    const { taskId } = req.params;
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status, content, sortOrder },
      { new: true }
    );

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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const GetTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ userId });
    res
      .status(200)
      .json({ message: "Tasks retrieved successfully", success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
};

export const DeleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;

    const task = await Task.deleteOne({ _id: taskId });

    if (task.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
      _id: taskId,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
