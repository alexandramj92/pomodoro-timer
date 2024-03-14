"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controllers/AuthController");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const router = express_1.default.Router();
router.post("/signup", AuthController_1.Signup);
router.post("/login", AuthController_1.Login);
router.post("/", AuthMiddleware_1.userVerification);
exports.default = router;
