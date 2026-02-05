import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRoute from "./routes/auth.routes.js";
import teacherRoute from "./routes/teacher.routes.js";
import attendanceRoute from "./routes/attendance.route.js";
import refreshSessionRoute from "./routes/refreshSession.route.js";

const app = express();
const PORT = process.env.SERVER_PORT || 8800;

// apply middleware correctly
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// mount routes under /api/v1
app.use("/api/v1", authRoute);
app.use("/api/v1", teacherRoute);
app.use("/api/v1", attendanceRoute);
app.use("/api/v1", refreshSessionRoute);

app.get("/", (req, res) => {
  res.json({
    status: "Success connect",
    message: "success connect with API",
  });
});

app.listen(PORT, () => {
  console.log("PayFlow server running on port", PORT);
});

// centralized error handler to ensure responses are returned promptly
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    status: "Error",
    message: err.message || "Internal Server Error",
  });
});
