import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute";

const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
//connect to MongoDB
if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));
}

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://pomo-tasker-405fd1be4689.herokuapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
console.log(process.env.NODE_ENV, "process.env.NODE_ENV");

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "..", "build")));
  // The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

// API routes with /api prefix
app.use("/api", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!!!`);
});
