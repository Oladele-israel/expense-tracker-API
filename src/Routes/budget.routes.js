import express from "express";
import {
  createBudget,
  deleteBudget,
  getBudget,
  updateBudget,
} from "../controllers/budgets.controller.js";
import { checkAndRenewToken } from "../middleware/validateToken.js";
import { checkBudgetMiddleware } from "../middleware/checkbudgetMiddleware.js";
const budgetsRouter = express.Router();

budgetsRouter.post("/create", checkAndRenewToken, createBudget);
budgetsRouter.get("/", checkAndRenewToken, getBudget);
budgetsRouter.put("/:id", checkAndRenewToken, updateBudget);
budgetsRouter.delete("/:id", checkAndRenewToken, deleteBudget);

export default budgetsRouter;
