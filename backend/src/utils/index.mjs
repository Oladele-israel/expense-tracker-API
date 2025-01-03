import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pool from "./db.js";

const api_key = process.env.AI_KEY;

const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getExpenseCategory = async (description) => {
  try {
    const result = await model.generateContent(
      `You are a helpful assistant categorize this description: ${description}, based on the following categories: Groceries','Leisure','Electronics','Utilities','Clothing','Health','Others`
    );
    const textResponse = result.response.text();
    const formattedText =
      textResponse.charAt(0).toUpperCase() +
      textResponse.slice(1).toLowerCase();
    return formattedText;
  } catch (error) {
    console.error("Error predicting category:", error);
    throw new Error("Failed to predict category");
  }
};

// prompt for using expense data to validate response:
export const getAIinsights = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenseQuery = `SELECT SUM(amount) AS total_expenses FROM expense WHERE user_id = $1;`;
    const expenseResult = await pool.query(expenseQuery, [userId]);
    const totalExpenses = expenseResult.rows[0]?.total_expenses || 0;

    const budgetQuery = `SELECT * FROM budgets WHERE user_id = $1;`;
    const budgetResult = await pool.query(budgetQuery, [userId]);
    const totalBudget = budgetResult.rows[0]?.amount || 0;

    const prompt = `
      The user has the following financial data:
      - Total expenses: $${totalExpenses}
      - Total budget: $${totalBudget}
      
      Please analyze the user's spending habits and provide insights and advice. 
      Is the user overspending? What recommendations do you have to help them stay within budget or save money?
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    const formattedText =
      textResponse.charAt(0).toUpperCase() +
      textResponse.slice(1).toLowerCase();

    res.status(200).json({
      success: true,
      insights: formattedText,
    });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
