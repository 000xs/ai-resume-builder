import axios from "axios"

const uplode = () => {
    const resume = {
        "resumeData": {
            "fullName": "John Doe",
            "contactInfo": {
                "email": "john.doe@example.com",
                "phone": "+1234567890"
            },
            "careerObjective": "Detail-oriented software engineer with 5+ years of experience in full-stack development, looking to leverage expertise in building scalable applications.",
            "workExperience": [
                {
                    "jobTitle": "Senior Software Engineer",
                    "companyName": "Tech Solutions Inc.",
                    "years": "2019 - Present",
                    "description": "Lead a team of developers in building enterprise-level applications, focusing on optimizing user experience and performance."
                },
                {
                    "jobTitle": "Software Engineer",
                    "companyName": "Innovatech",
                    "years": "2016 - 2019",
                    "description": "Contributed to various projects including web applications and RESTful services, collaborating closely with cross-functional teams."
                }
            ],
            "education": [
                {
                    "degree": "Bachelor of Science in Computer Science",
                    "institution": "University of Example",
                    "yearsAttended": "2012 - 2016"
                }
            ],
            "skills": [
                "JavaScript",
                "React",
                "Node.js",
                "Python",
                "CSS"
            ],
            "certifications": [
                "Certified Scrum Master",
                "AWS Certified Solutions Architect"
            ],
            "internships": [
                {
                    "jobTitle": "Intern Developer",
                    "companyName": "Intern Co.",
                    "years": "2015",
                    "description": "Assisted in the development of a web-based project management tool, focusing on frontend development."
                }
            ]
        },
        "selectedTemplate": "modern"

    }

    const getData = async () => {
        const result = await axios.post("/api/generate-content", resume);
         
    }
    return (
        <div>
            <button onClick={getData}>get pdf</button>
        </div>
    )
}

export default uplode