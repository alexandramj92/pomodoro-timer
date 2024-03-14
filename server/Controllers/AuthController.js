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
exports.Login = exports.Signup = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const SecretToken_1 = require("../util/SecretToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = yield UserModel_1.default.create({ email, password, username, createdAt });
        const token = (0, SecretToken_1.createSecretToken)(user._id.toString());
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.Signup = Signup;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.json({ message: "Incorrect password or email" });
        }
        const auth = yield bcrypt_1.default.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect password or email" });
        }
        const token = (0, SecretToken_1.createSecretToken)(user._id);
        res.cookie("token", token, {
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User logged in successfully", success: true });
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.Login = Login;
