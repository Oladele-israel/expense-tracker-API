import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = "AIzaSyAH3zQ30ZIBQiRFQ_AR13HAHEC_7LQ1Q6g";

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
