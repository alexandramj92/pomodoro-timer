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
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controllers/AuthController");
const AuthMiddleware_1 = require("../Middlewares/AuthMiddleware");
const router = express_1.default.Router();
router.post("/signup", AuthController_1.Signup);
router.post("/login", AuthController_1.Login);
// router.use(userVerification);
// router.post("/", res.json({}));
router.post("/", AuthMiddleware_1.userVerification, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ status: true, user: req === null || req === void 0 ? void 0 : req.user.username, id: req === null || req === void 0 ? void 0 : req.user._id });
}));
exports.default = router;
