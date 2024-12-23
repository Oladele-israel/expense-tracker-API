import { budgetSchema } from "../utils/validator.js";
import pool from "../utils/db.js";

// get all budgets
export const getBudget = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `SELECT * FROM budgets WHERE user_id = $1;`;
    const result = await pool.query(query, [userId]);
    return res.status(200).json({
      success: true,
      budgets: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// createBudget
export const createBudget = async (req, res) => {
  const { category, amount } = req.body;
  const userId = req.user.id;

  const { error } = budgetSchema.validate({
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
      INSERT INTO budgets (user_id, category, amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [userId, category, amount];

    const result = await pool.query(query, values);
    res.status(201).json({
      success: true,
      message: "budget added successfully",
      budgets: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "This category is already assigned a budget" });
  }
};

export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { category, amount } = req.body;
  const userId = req.user.id;

  const { error } = budgetSchema.validate({
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
        UPDATE budgets
        SET  category = $1, amount = $2
        WHERE id = $3 AND user_id = $4
        RETURNING *;
      `;

    const values = [category, amount, id, userId];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "budget not found or you are not authorized to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "budget updated successfully",
      budget: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const query = `DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *;`;
    const result = await pool.query(query, [id, userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "budget not found or you are not authorized to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "budgetdeleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get the total budget for all categories
export const getTotalBudget = async (req, res) => {
  const userId = req.user.id;

  try {
    // Query to calculate the sum of all budget amounts for the user
    const query = `
      SELECT COALESCE(SUM(amount), 0) AS total_budget 
      FROM budgets 
      WHERE user_id = $1;
    `;
    const result = await pool.query(query, [userId]);

    // Extract the total budget from the query result
    const totalBudget = result.rows[0].total_budget;

    res.status(200).json({
      success: true,
      totalBudget,
    });
  } catch (err) {
    console.error("Error fetching total budget:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
