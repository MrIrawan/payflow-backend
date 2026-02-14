import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// admin routes
import adminAuthRoute from "./routes/admin/auth/adminAuth.route.js";
import teacherRoute from "./routes/admin/teacher/teacher.routes.js";
import attendanceRoute from "./routes/admin/attendance/attendance.route.js";

// user endpoints
import authRoute from "./routes/user/auth/auth.routes.js";
import teacherProfileRoute from "./routes/user/profile/getUserProfile.route.js";
import editTeacherProfile from "./routes/user/profile/editUserProfile.route.js";

import refreshSessionRoute from "./routes/refreshSession.route.js";
import logoutRoute from "./routes/logout.route.js";

import calculateSalaryRoute from "./routes/calculateSalary.route.js";
import payrollCalcRoute from "./routes/payrollCalc.route.js";

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

// admin endpoint
app.use("/api/admin", adminAuthRoute);
app.use("/api/admin", teacherRoute);
app.use("/api/admin", attendanceRoute);

// user endpoint
app.use("/api/employee", authRoute);
app.use("/api/employee", teacherProfileRoute);
app.use("/api/employee", editTeacherProfile);

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
