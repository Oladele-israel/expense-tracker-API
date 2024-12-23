import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  filterExpenses,
} from "../controllers/expense.controller.js";
import { checkAndRenewToken } from "../middleware/validateToken.js";
import { checkBudgetMiddleware } from "../middleware/checkbudgetMiddleware.js";
const expenseRouter = express.Router();

expenseRouter.post(
  "/create",
  checkAndRenewToken,
  checkBudgetMiddleware,
  createExpense
);
expenseRouter.get("/", checkAndRenewToken, getExpenses);
expenseRouter.put("/:id", checkAndRenewToken, updateExpense);
expenseRouter.delete("/:id", checkAndRenewToken, deleteExpense);
expenseRouter.get("/filter", checkAndRenewToken, filterExpenses);

export default expenseRouter;
