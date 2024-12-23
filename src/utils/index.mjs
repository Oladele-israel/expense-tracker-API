import "dotenv/config";
import OpenAI from "openai";

const api_key = process.env.AI_KEY;

const openai = new OpenAI({
  apiKey: api_key,
});

export const getExpenseCategory = async (description) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Categorize the following expense description: "${description}"`,
        },
      ],
      max_tokens: 10,
      temperature: 0.5,
    });
    console.log(response);

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error predicting category:", error);
    throw new Error("Failed to predict category");
  }
};
