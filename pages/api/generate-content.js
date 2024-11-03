// pages/api/generate-pdf.js
import { generateResume } from "@/utils/templets";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { PDFDocument, rgb } from 'pdf-lib'; // Ensure you have pdf-lib installed
 

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY; // Ensure the correct environment variable name
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

  const { resumeData } = req.body;

  // Construct the prompt for the AI model
  const prompt = `
    Create a resume for ${resumeData.fullName}. 
    Contact Info: ${resumeData.contactInfo.email}, ${resumeData.contactInfo.phone}. 
    Career Objective: ${resumeData.careerObjective}. 
    Work Experience: ${resumeData.workExperience.map(job => `${job.jobTitle} at ${job.companyName}`).join(', ')}.
    Education: ${resumeData.education.map(edu => `${edu.degree} from ${edu.institution}`).join(', ')}.
    Skills: ${resumeData.skills.join(', ')}.
    Certifications: ${resumeData.certifications.join(', ')}.
    Internships: ${resumeData.internships.map(intern => `${intern.jobTitle} at ${intern.companyName}`).join(', ')}.
  `;

  try {
     // Generate the resume text using the AI model
     const result = await GeminiModel.generateContent(prompt);
     const resumeText = result.response.text; // Adjust according to the actual API response structure

     // Optionally, merge resumeText into resumeData if needed
     resumeData.careerObjective = resumeText; // Example of using AI-generated text

     // Create a PDF document
     const pdfDoc = await PDFDocument.create();
     const page = pdfDoc.addPage([600, 400]);

     // Generate the resume using the selected template
     await generateResume(pdfDoc, page, resumeData, selectedTemplate);

     // Serialize the PDFDocument to bytes
     const pdfBytes = await pdfDoc.save();

     // Set the response headers to indicate a PDF file
     res.setHeader('Content-Type', 'application/pdf');
     res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
     res.status(200).send(pdfBytes);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
