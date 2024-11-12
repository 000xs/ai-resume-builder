import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
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

  const { JobExperience, Skills, Education } = req.body;

  const prompt = `
  Generate a professional resume summary for a candidate with the following details:
     
     
    Work Experience: ${JobExperience.map(
      (job) =>
        `${job.position} at ${job.companyName} (${job.startDate} to ${job.endDate}): ${job.description}`
    ).join(", ")}.
    Education: ${Education.map(
      (edu) => `${edu.degree} from ${edu.institution} (${edu.year})`
    ).join(", ")}.
    Skills: ${Skills.join(", ")}.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);

    // Accessing the summary text directly from the response structure
    if (
      result &&
      result.response &&
      result.response.candidates &&
      result.response.candidates.length > 0 &&
      result.response.candidates[0].content &&
      result.response.candidates[0].content.parts &&
      result.response.candidates[0].content.parts.length > 0
    ) {
      const summaryText = result.response.candidates[0].content.parts[0].text;

      // Send only the summary text as a response
      return res.status(200).json({ summaryText });
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      error: "Failed to generate resume summary",
      details: error.message,
    });
  }
}
