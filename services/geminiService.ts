
import { GoogleGenAI, Type } from "@google/genai";
import { Category } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      enum: Object.values(Category),
      description: 'The category of the transaction.',
    },
    subcategory: {
      type: Type.STRING,
      description: 'The specific subcategory of the transaction.'
    }
  },
  required: ['category', 'subcategory'],
};

export const categorizeTransaction = async (description: string): Promise<{ category: Category; subcategory: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following transaction description and categorize it. The main categories are 'Expense', 'Income', 'Savings'. Choose the most appropriate category and a suitable subcategory. Description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text;
    const parsedResponse = JSON.parse(jsonString);

    if (Object.values(Category).includes(parsedResponse.category) && typeof parsedResponse.subcategory === 'string') {
       return {
           category: parsedResponse.category as Category,
           subcategory: parsedResponse.subcategory,
       };
    } else {
        throw new Error("Invalid response format from AI");
    }

  } catch (error) {
    console.error("Error categorizing transaction:", error);
    throw new Error("Failed to categorize transaction with AI. Please try again or select a category manually.");
  }
};
