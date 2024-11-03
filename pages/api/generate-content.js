import { generateResume } from "@/utils/templets";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { PDFDocument } from 'pdf-lib';
import path from 'path';
import fs from 'fs';
import { uplodeBucket } from '@/utils/uplode'; // Ensure correct import path

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

  const { resumeData, selectedTemplate } = req.body;

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
    const result = await geminiModel.generateContent(prompt);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    await generateResume(pdfDoc, page, resumeData, selectedTemplate);

    const pdfBytes = await pdfDoc.save();
    
    const tempFilePath = path.join(__dirname, 'temp-resume.pdf');
    fs.writeFileSync(tempFilePath, pdfBytes); // Save PDF to temp file

    const fileStream = fs.createReadStream(tempFilePath); // Create read stream for upload

    console.log('UplodeBucket Function:', uplodeBucket); // Debugging log

    await uplodeBucket(fileStream); // Upload to bucket

    res.status(200).json({ message: "File uploaded successfully" });
    
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate or upload PDF", details: error.message });
  }
}