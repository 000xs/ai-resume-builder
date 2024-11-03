// pages/api/generate-resume.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiConfig = {
  temperature: 0.8,
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

  const {
    personalInfo,
    careerObjective,
    workExperience,
    education,
    skills,
    certifications,
    keywords,
    additionalSections,
    formattingPreferences,
    customizationOptions,
  } = req.body;

  // Constructing a detailed prompt based on the requirements
  const prompt = `
  Generate a resume in a ${formattingPreferences.resumeStyle} style with a ${formattingPreferences.designPreferences.colorScheme} color scheme and ${formattingPreferences.designPreferences.fontStyle} font.

  1. **Personal Information**
     - **Name:** ${userInformation.personalInfo.fullName}
     - **Contact:** 
       - Phone: ${userInformation.personalInfo.contactInformation.phoneNumber}
       - Email: ${userInformation.personalInfo.contactInformation.emailAddress}
     - **LinkedIn:** ${userInformation.personalInfo.linkedinProfile || "N/A"}
  
  2. **Career Objective**
     - ${userInformation.careerObjective || "Not provided"}
  
  3. **Work Experience**
  ${userInformation.workExperience.map(
    (exp) => `
      - **Job Title:** ${exp.jobTitle}
      - **Company:** ${exp.companyName}
      - **Employment Dates:** ${exp.datesOfEmployment.startDate} to ${exp.datesOfEmployment.endDate}
      - **Responsibilities and Achievements:**
        ${exp.responsibilitiesAchievements.map((resp) => `• ${resp}`).join("\n      ")}
    `
  ).join("\n")}
  
  4. **Education**
  ${userInformation.education.map(
    (edu) => `
      - **Degree:** ${edu.degreeObtained}
      - **Institution:** ${edu.institutionAttended}
      - **Graduation Date:** ${edu.graduationDate}
      - **Relevant Coursework or Honors:** ${edu.relevantCourseworkHonors.join(", ") || "N/A"}
    `
  ).join("\n")}
  
  5. **Skills**
     - **Hard Skills:** ${userInformation.skills.hardSkills.join(", ")}
     - **Soft Skills:** ${userInformation.skills.softSkills.join(", ")}
  
  6. **Certifications and Licenses**
  ${userInformation.skills.certificationsLicenses.map(
    (cert) => `
      - **Certification:** ${cert.certificationName}
      - **Issuing Organization:** ${cert.issuingOrganization}
      - **Date Issued:** ${cert.issueDate || "N/A"}
    `
  ).join("\n")}
  
  7. **Keywords and Industry-specific Terminology**
     - **Keywords:** ${userInformation.keywordsPhrases.join(", ")}
  
  8. **Additional Sections**
  ${
    userInformation.additionalSections.volunteerExperience.length > 0
      ? `**Volunteer Experience:**\n${userInformation.additionalSections.volunteerExperience.map(exp => `
        - Role: ${exp.roleTitle}
        - Organization: ${exp.organizationName}
        - Dates of Service: ${exp.datesOfService.startDate} to ${exp.datesOfService.endDate}
        - Description: 
          ${exp.description.join("\n        ")}
      `).join("\n")}`
      : ""
  }
  ${
    userInformation.additionalSections.projects
      ? `**Projects/Portfolio:**\n${userInformation.additionalSections.projects.join(", ")}`
      : ""
  }
  ${
    userInformation.additionalSections.publications
      ? `**Publications/Presentations:**\n${userInformation.additionalSections.publications.join(", ")}`
      : ""
  }
  ${
    userInformation.additionalSections.languages
      ? `**Languages:**\n${userInformation.additionalSections.languages.join(", ")}`
      : ""
  }
  
  9. **Customization**
     - **Tailoring for Job Applications:** ${customizationOptions.tailorForSpecificJobs ? "Yes" : "No"}
     - **Emphasize Experience Areas:** ${customizationOptions.emphasizeExperienceAreas.join(", ") || "N/A"}
  
  Include industry-specific terminology to improve ATS compatibility and organize content as specified. Ensure a consistent and professional format, adhering to user preferences for length and layout.
`;

  try {
    // Generate the résumé text
    const result = await geminiModel.generateContent(prompt);
    const response = result.response; // Adjust according to the API response structure
    res.status(200).json({ result: response.text() });
  } catch (error) {
    console.error("Response error:", error);
    res.status(500).json({ error: "Failed to generate résumé" });
  }
}
