"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoute_1 = __importDefault(require("../Routes/AuthRoute")); // Adjust the path as necessary
const TaskRoutes_1 = __importDefault(require("../Routes/TaskRoutes")); // Adjust the path as necessary
const router = express_1.default.Router();
// Use the specific routes from each file
router.use("/", AuthRoute_1.default);
router.use("/tasks", TaskRoutes_1.default);
exports.default = router;
