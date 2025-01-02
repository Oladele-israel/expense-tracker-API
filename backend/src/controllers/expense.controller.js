import pool from "../utils/db.js";
import { getExpenseCategory } from "../utils/index.mjs";
import { expenseValidationSchema } from "../utils/validator.js";

// Create an expense
export const createExpense = async (req, res) => {
  const { title, description, category, amount } = req.body;
  const user_id = req.user.id;
  const budget = req.budget;

  let expenseCategory = category;

  if (!category) {
    try {
      expenseCategory = await getExpenseCategory(description);
      console.log("this is the expense category-->", expenseCategory);
    } catch (error) {
      return res.status(500).json({ error: "Failed to categorize expense" });
    }
  }
  expenseCategory = expenseCategory?.trim();
  try {
    const query = `
          INSERT INTO expense (user_id, title, description, category, amount)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
      `;
    const values = [user_id, title, description, expenseCategory, amount];
    const expenseResult = await pool.query(query, values);

    const updateBudgetQuery =
      "UPDATE budgets SET amount = amount - $1 WHERE id = $2 RETURNING *;";
    const updatedBudget = await pool.query(updateBudgetQuery, [
      amount,
      budget.id,
    ]);

    res.status(201).json({
      message: "Expense recorded and budget updated",
      expense: expenseResult.rows[0],
      updatedBudget: updatedBudget.rows[0],
    });
  } catch (error) {
    console.error("Error recording expense:", error);
    res.status(500).json({ error: "Error recording expense" });
  }
};

// Read all expenses for the authenticated user
export const getExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `SELECT * FROM expense WHERE user_id = $1;`;
    const result = await pool.query(query, [userId]);

    res.status(200).json({
      success: true,
      expenses: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single expense by ID
export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const query = `SELECT * FROM expense WHERE id = $1 AND user_id = $2;`;
    const result = await pool.query(query, [id, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Expense not found or you are not authorized to view it",
      });
    }

    res.status(200).json({
      success: true,
      expense: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, amount } = req.body;
  const userId = req.user.id;

  const { error } = expenseValidationSchema.validate({
    title,
    description,
    category,
    amount,
  });

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    const query = `
        UPDATE expense
        SET title = $1, description = $2, category = $3, amount = $4
        WHERE id = $5 AND user_id = $6
        RETURNING *;
      `;

    const values = [title, description, category, amount, id, userId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Expense not found or you are not authorized to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const query = `DELETE FROM expense WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const result = await pool.query(query, [id, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Expense not found or you are not authorized to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// filter expense
export const filterExpenses = async (req, res) => {
  const userId = req.user.id;
  const { filter, startDate, endDate } = req.query;

  let query = `SELECT * FROM expense WHERE user_id = $1`;
  const values = [userId];

  if (filter === "past_week") {
    query += ` AND created_at >= NOW() - INTERVAL '7 days'`;
  } else if (filter === "last_month") {
    query += ` AND created_at >= NOW() - INTERVAL '1 month'`;
  } else if (filter === "last_3_months") {
    query += ` AND created_at >= NOW() - INTERVAL '3 months'`;
  } else if (filter === "custom" && startDate && endDate) {
    query += ` AND created_at BETWEEN $2 AND $3`;
    values.push(startDate, endDate);
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json({
      success: true,
      expenses: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTotalExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `SELECT SUM(amount) AS total_expenses FROM expense WHERE user_id = $1;`;
    const result = await pool.query(query, [userId]);

    const totalExpenses = result.rows[0]?.total_expenses || 0; // Default to 0 if no expenses

    res.status(200).json({
      success: true,
      totalExpenses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
