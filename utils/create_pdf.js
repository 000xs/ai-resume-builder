const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");

const resumeData = { 
    personalData: {
        fullname: "John Doe",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...", // Shortened for example
        location: "New York, NY",
        tel: "+1 (555) 123-4567",
        email: "john.doe@example.com",
        linkedin: "https://www.linkedin.com/in/johndoe",
        portfolio: "https://johndoeportfolio.com"
    },
    JobExperience: {
        jobTitle: "Software Engineer",
        companyName: "Tech Solutions Inc.",
        companyLocation: "San Francisco, CA",
        datesEmployment: "June 2020 - Present"
    },
    Skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "Git"],
    Education: [
        {
            degree: "Bachelor of Science in Computer Science",
            field: "Computer Science",
            institution: "University of California, Berkeley",
            year: "2020"
        },
        {
            degree: "Master of Science in Software Engineering",
            field: "Software Engineering",
            institution: "Stanford University",
            year: "2022"
        }
    ],
    Template: "Modern Professional"
};

export function GenerateDoc() {
    // Create a new document
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    // Full name and personal data
                    new Paragraph({
                        children: [new TextRun({ text: resumeData.personalData.fullname, bold: true, size: 28 })],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun(`Location: ${resumeData.personalData.location}`),
                            new TextRun(`\nPhone: ${resumeData.personalData.tel}`),
                            new TextRun(`\nEmail: ${resumeData.personalData.email}`),
                            new TextRun(`\nLinkedIn: ${resumeData.personalData.linkedin}`),
                            new TextRun(`\nPortfolio: ${resumeData.personalData.portfolio}`)
                        ],
                    }),
                    
                    // Job Experience
                    new Paragraph({
                        spacing: { before: 400 },
                        children: [new TextRun({ text: "Job Experience", bold: true, size: 24 })],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun(`Position: ${resumeData.JobExperience.jobTitle}`),
                            new TextRun(`\nCompany: ${resumeData.JobExperience.companyName}`),
                            new TextRun(`\nLocation: ${resumeData.JobExperience.companyLocation}`),
                            new TextRun(`\nDates: ${resumeData.JobExperience.datesEmployment}`)
                        ],
                    }),

                    // Skills
                    new Paragraph({
                        spacing: { before: 400 },
                        children: [new TextRun({ text: "Skills", bold: true, size: 24 })],
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.Skills.join(", "))]
                    }),

                    // Education
                    new Paragraph({
                        spacing: { before: 400 },
                        children: [new TextRun({ text: "Education", bold: true, size: 24 })],
                    }),
                    ...resumeData.Education.map(edu => 
                        new Paragraph({
                            children: [
                                new TextRun(`${edu.degree} in ${edu.field} - ${edu.institution}, ${edu.year}`)
                            ],
                        })
                    ),
                ],
            },
        ],
    });

    // Generate and save the document
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Resume.docx", buffer);
        console.log("Resume.docx created successfully!");
    });
}

// Run the function to generate the resume

