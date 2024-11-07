import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getSuggestions(todo: string) {
  try {
    const prompt = `Given this todo item: "${todo}", suggest 3 specific actionable steps to complete it. Respond ONLY with a JSON array of strings, nothing else.`;
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const response = await result.response;
    const cleanedText = response.text()
      .replace(/```json\n?/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // If parsing fails, attempt to extract array-like content
      const matches = cleanedText.match(/\[(.*)\]/s);
      if (matches) {
        return JSON.parse(matches[0]);
      }
      return [];
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return [];
  }
}