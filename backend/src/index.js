import express from "express";
import pool from "./utils/db.js";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";
import expenseRouter from "./Routes/expense.routes.js";
import budgetsRouter from "./Routes/budget.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://limitless-xpnx.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/budgets", budgetsRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log("Connected to the database");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});
