"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model("Task", taskSchema);
