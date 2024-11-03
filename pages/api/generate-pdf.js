// pages/api/generate-pdf.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { PDFDocument, rgb } from 'pdf-lib';

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
  config: geminiConfig,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { resumeData, selectedTemplate } = req.body;

  if (!resumeData || !selectedTemplate) {
    return res.status(400).json({ error: 'Missing resume data or template' });
  }

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  // Define title and background color based on the selected template
  let titleColor = rgb(0, 0, 0);
  let bgColor = rgb(1, 1, 1);

  switch (selectedTemplate) {
    case 'modern':
      titleColor = rgb(0.1, 0.5, 0.9);
      break;
    case 'classic':
      titleColor = rgb(0, 0, 0);
      break;
    case 'creative':
      bgColor = rgb(0.9, 0.1, 0.1);
      break;
    default:
      return res.status(400).json({ error: 'Invalid template selected' });
  }

  // Set the background color of the page
  page.drawRectangle({
    x: 0,
    y: 0,
    width: 600,
    height: 400,
    color: bgColor,
  });

  // Prepare the prompt for AI content generation
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
    const result = await geminiModel.generate({ prompt });
    const resumeText = result.text; // Adjust according to the API response structure

    // Add content to the PDF
    page.drawText(`Name: ${resumeData.fullName}`, { x: 50, y: 350, size: 20, color: titleColor });
    page.drawText(`Email: ${resumeData.contactInfo.email}`, { x: 50, y: 320, size: 15 });
    page.drawText(`Phone: ${resumeData.contactInfo.phone}`, { x: 50, y: 290, size: 15 });
    page.drawText(`Career Objective: ${resumeData.careerObjective}`, { x: 50, y: 260, size: 15 });
    page.drawText(resumeText, { x: 50, y: 230, size: 15 });

    // Finalize the PDF and send it back
    const pdfBytes = await pdfDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    return res.send(pdfBytes);

  } catch (error) {
    console.error('Error generating content:', error);
    return res.status(500).json({ error: 'Error generating resume content', details: error.message });
  }
}
