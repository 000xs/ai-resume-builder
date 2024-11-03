import { rgb } from 'pdf-lib';

// Modern Template
export async function createModernResume(pdfDoc, page, resumeData) {
  const titleColor = rgb(0.1, 0.5, 0.9);
  const bgColor = rgb(1, 1, 1);

  // Set the background color
  page.drawRectangle({ x: 0, y: 0, width: 600, height: 400, color: bgColor });

  // Draw content
  page.drawText(`Name: ${resumeData.fullName}`, { x: 50, y: 350, size: 24, color: titleColor });
  page.drawText(`Email: ${resumeData.contactInfo.email}`, { x: 50, y: 320, size: 14 });
  page.drawText(`Phone: ${resumeData.contactInfo.phone}`, { x: 50, y: 300, size: 14 });
  page.drawText(`Career Objective: ${resumeData.careerObjective}`, { x: 50, y: 270, size: 14 });
  page.drawText(`Work Experience: ${resumeData.workExperience.map(job => `${job.jobTitle} at ${job.companyName}`).join(', ')}`, { x: 50, y: 250, size: 14 });
}

// Classic Template
export async function createClassicResume(pdfDoc, page, resumeData) {
  const titleColor = rgb(0, 0, 0);
  const bgColor = rgb(1, 1, 1);

  // Set the background color
  page.drawRectangle({ x: 0, y: 0, width: 600, height: 400, color: bgColor });

  // Draw sections
  page.drawText(`Name: ${resumeData.fullName}`, { x: 50, y: 370, size: 22, color: titleColor });
  page.drawText(`Contact Information`, { x: 50, y: 340, size: 16, color: titleColor });
  page.drawText(`Email: ${resumeData.contactInfo.email}`, { x: 50, y: 320, size: 14 });
  page.drawText(`Phone: ${resumeData.contactInfo.phone}`, { x: 50, y: 300, size: 14 });
  page.drawText(`Career Objective`, { x: 50, y: 280, size: 16, color: titleColor });
  page.drawText(`${resumeData.careerObjective}`, { x: 50, y: 260, size: 14 });
}

// Creative Template
export async function createCreativeResume(pdfDoc, page, resumeData) {
  const titleColor = rgb(1, 1, 1);
  const bgColor = rgb(0.9, 0.1, 0.1);

  // Set the background color
  page.drawRectangle({ x: 0, y: 0, width: 600, height: 400, color: bgColor });

  // Draw content with a creative flair
  page.drawText(`Name: ${resumeData.fullName}`, { x: 50, y: 350, size: 26, color: titleColor });
  page.drawText(`Contact: ${resumeData.contactInfo.email} | ${resumeData.contactInfo.phone}`, { x: 50, y: 320, size: 14, color: titleColor });
  page.drawText(`Objective: ${resumeData.careerObjective}`, { x: 50, y: 290, size: 14, color: titleColor });
  page.drawText(`Experience: ${resumeData.workExperience.map(job => `${job.jobTitle} at ${job.companyName}`).join(' | ')}`, { x: 50, y: 260, size: 14, color: titleColor });
}

// Technical Template
export async function createTechnicalResume(pdfDoc, page, resumeData) {
  const titleColor = rgb(0, 0, 0);
  const bgColor = rgb(0.95, 0.95, 0.95);

  // Set the background color
  page.drawRectangle({ x: 0, y: 0, width: 600, height: 400, color: bgColor });

  // Draw headings
  page.drawText(`Name: ${resumeData.fullName}`, { x: 50, y: 360, size: 24, color: titleColor });
  page.drawText(`Contact: ${resumeData.contactInfo.email} | ${resumeData.contactInfo.phone}`, { x: 50, y: 330, size: 14, color: titleColor });

  // Draw sections
  page.drawText(`Work Experience:`, { x: 50, y: 310, size: 18, color: titleColor });
  page.drawText(`${resumeData.workExperience.map(job => `${job.jobTitle} at ${job.companyName}`).join('\n')}`, { x: 50, y: 290, size: 14 });
  page.drawText(`Skills: ${resumeData.skills.join(', ')}`, { x: 50, y: 220, size: 14 });
}

// Function to generate resume based on selected template
export async function generateResume(pdfDoc, page, resumeData, selectedTemplate) {
  switch (selectedTemplate) {
    case 'modern':
      await createModernResume(pdfDoc, page, resumeData);
      break;
    case 'classic':
      await createClassicResume(pdfDoc, page, resumeData);
      break;
    case 'creative':
      await createCreativeResume(pdfDoc, page, resumeData);
      break;
    case 'technical':
      await createTechnicalResume(pdfDoc, page, resumeData);
      break;
    default:
      throw new Error('Invalid template selected');
  }
}
