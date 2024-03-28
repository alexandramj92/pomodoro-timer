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
exports.userVerification = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("express");
dotenv_1.default.config();
const userVerification = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ status: false, message: "No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY);
        const user = yield UserModel_1.default.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        // Attach user information to the request object
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle token verification errors (e.g., token expired)
        return res
            .status(401)
            .json({ status: false, message: "Invalid or expired token" });
    }
});
exports.userVerification = userVerification;
