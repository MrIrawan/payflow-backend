import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

import authRoute from "./routes/auth.routes.js";
import teacherRoute from "./routes/teacher.routes.js";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// apply middleware correctly
app.use(cors());
app.use(bodyParser.json());

// mount routes under /api/v1
app.use("/api/v1", authRoute);
app.use("/api/v1", teacherRoute);

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
