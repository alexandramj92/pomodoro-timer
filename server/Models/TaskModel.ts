import mongoose, { Document } from "mongoose";

interface Task extends Document {
  content: string;
  status: "to-do" | "completed" | "in-session";
  sortOrder: number;
  secondsSpent: number;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "The task status is required"],
    enum: ["to-do", "completed", "in-session"],
  },
  sortOrder: {
    type: Number,
    required: false,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  secondsSpent: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<Task>("Task", taskSchema);
