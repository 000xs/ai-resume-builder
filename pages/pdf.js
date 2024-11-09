// pages/index.js
import dynamic from 'next/dynamic';

const GeneratePDF = dynamic(() => import('@/components/GeneratePDF'), { ssr: false });
const CVTemplate = dynamic(() => import('@/components/CVTemplate'), { ssr: false });

const userData = {
  personalData: {
      fullname: "John Doe",
      image: "data:image/png;base64,...", // Base64 image string
      location: "New York, NY",
      tel: "+1 234 567 8901",
      email: "john.doe@example.com",
      linkedin: "https://linkedin.com/in/johndoe",
      portfolio: "https://johndoeportfolio.com"
  },
  jobExperience: {
      jobTitle: "Software Engineer",
      companyName: "Tech Solutions Inc.",
      companyLocation: "San Francisco, CA",
      datesEmployment: "June 2020 - Present"
  },
  skills: ["JavaScript", "React", "Node.js", "CSS"],
  education: [
      {
          degree: "Bachelor of Science in Computer Science",
          institution: "University of Example",
          graduationYear: 2020
      }
  ],
  template: "default" // Placeholder for selected template
};
 


export default function Home() {
    return (
        <div>
            <h1>Welcome to PDF Generator</h1>
            {/* <GeneratePDF /> */}
            <CVTemplate userData={userData} />
             
        </div>
    );
}