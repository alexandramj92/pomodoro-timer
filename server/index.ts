import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute";

const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!!!`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoute);
