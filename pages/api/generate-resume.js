// pages/api/generate-resume.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY; // Use the correct environment variable name
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { jobDescription, name, experience, skills } = req.body;

  // Construct the prompt for the AI model
  const prompt = `Create a resume for ${name} with experience in ${experience} and skills in ${skills}. Job description: ${jobDescription}.`;

  try {
    // Generate the résumé text
    const result = await geminiModel.generateContent(prompt);
    const response = result.response; // Adjust according to the API response structure
    res.status(200).json({ result: response.text() }); // Ensure this matches how your API returns text
  } catch (error) {
    console.error("Response error:", error);
    res.status(500).json({ error: "Failed to generate résumé" });
  }
}
