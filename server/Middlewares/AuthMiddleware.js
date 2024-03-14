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
dotenv_1.default.config();
const userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        const data = decoded;
        if (err || !data) {
            return res.json({ status: false });
        }
        else {
            const user = yield UserModel_1.default.findById(data.id);
            if (user) {
                return res.json({ status: true, user: user.username });
            }
            else {
                return res.json({ status: false });
            }
        }
    }));
};
exports.userVerification = userVerification;
