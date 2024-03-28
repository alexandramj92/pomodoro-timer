"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./Routes/index"));
const app = (0, express_1.default)();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
//connect to MongoDB
if (MONGO_URL) {
    mongoose_1.default
        .connect(MONGO_URL)
        .then(() => console.log("MongoDB is  connected successfully"))
        .catch((err) => console.error(err));
}
//Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "https://pomo-tasker-405fd1be4689.herokuapp.com",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV === "production") {
    // Serve static files from the React app
    app.use(express_1.default.static(path_1.default.join(__dirname, "..", "build")));
    // The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "..", "build", "index.html"));
    });
}
// API routes with /api prefix
app.use("/api", index_1.default);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!!!`);
});
