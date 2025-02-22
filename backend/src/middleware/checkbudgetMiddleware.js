import pool from "../utils/db.js";
import { getExpenseCategory } from "../utils/index.mjs";

export const checkBudgetMiddleware = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "User is not authenticated" });
  }

  const user_id = req.user.id;
  const { category, amount, description } = req.body;
  let expenseCategory = category;

  if (!category) {
    expenseCategory = await getExpenseCategory(description);
  }
  expenseCategory = expenseCategory.trim();

  try {
    const budgetQuery =
      "SELECT * FROM budgets WHERE user_id = $1 AND category = $2;";
    const budgetResult = await pool.query(budgetQuery, [
      user_id,
      expenseCategory,
    ]);

    if (budgetResult.rows.length === 0) {
      return res.status(400).json({ error: "No budget set for this category" });
    }

    const budget = budgetResult.rows[0];
    if (amount > budget.amount) {
      return res.status(400).json({
        warning: "Expense exceeds budget, budget over",
        remainingBudget: budget.amount,
      });
    }

    // Attach budget info to request for further processing
    req.budget = budget;
    next();
  } catch (error) {
    console.error("Error in checkBudgetMiddleware:", error.message);
    res.status(500).json({ error: "Error checking budget" });
  }
};
