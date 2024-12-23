import express from "express";
import {
  createBudget,
  deleteBudget,
  getBudget,
  getTotalBudget,
  updateBudget,
} from "../controllers/budgets.controller.js";
import { checkAndRenewToken } from "../middleware/validateToken.js";

const budgetsRouter = express.Router();

budgetsRouter.post("/create", checkAndRenewToken, createBudget);
budgetsRouter.get("/", checkAndRenewToken, getBudget);
budgetsRouter.get("/total", checkAndRenewToken, getTotalBudget);
budgetsRouter.put("/:id", checkAndRenewToken, updateBudget);
budgetsRouter.delete("/:id", checkAndRenewToken, deleteBudget);

export default budgetsRouter;
