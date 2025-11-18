
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateRecipe(ingredients: string, mealType: string, language: Language): Promise<string> {
  const model = ai.models;

  const languagePrompt = language === Language.AR ? 'Arabic' : 'English';
  const mealTypePrompt = mealType === 'any' ? '' : ` for ${mealType}`;
  
  const prompt = `
    You are a creative and helpful chef.
    Your task is to generate a delicious recipe based on a list of ingredients.
    The user has the following ingredients: ${ingredients}.
    Create a recipe${mealTypePrompt}.
    
    The response must be in ${languagePrompt}.

    Format the response clearly with:
    1. A catchy and appropriate recipe name.
    2. A complete list of ingredients (including the ones provided and any others needed, specifying quantities).
    3. Step-by-step instructions that are easy to follow.

    Make the recipe sound appealing and delicious.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating recipe from Gemini:", error);
    throw new Error("Failed to generate recipe. Please check the API configuration and try again.");
  }
}
