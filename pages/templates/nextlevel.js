import { Fragment } from "react";

const ResumeTemplate = ({ userData }) => {
  return (
    <Fragment>
   
        <div className="resume w-full max-w-4xl bg-white grid grid-cols-1 md:grid-cols-3 shadow-lg">
          <div className="left-column bg-gray-800 text-white p-6">
            <div className="section">
              <h2 className="section-title uppercase font-bold mb-2">Contact</h2>
              <ul className="contact-info list-none">
                <li>📱 {userData.contact.phone}</li>
                <li>📧 {userData.contact.email}</li>
                <li>📍 {userData.contact.location}</li>
                <li>🌐 {userData.contact.website}</li>
              </ul>
            </div>

            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">Education</h2>
              {userData.education.map((edu, index) => (
                <div key={index} className="education-item mb-4">
                  <div className="date">{edu.date}</div>
                  <div className="company">{edu.degree}</div>
                  <div className="job-description">{edu.institution}</div>
                </div>
              ))}
            </div>

            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">Skills</h2>
              <ul className="skills-list list-none">
                {userData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">Language</h2>
              <ul className="language-list list-none">
                {userData.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="right-column p-6 bg-white md:col-span-2">
            <div className="profile-section flex items-center mb-6">
              <img src={userData.profileImage} alt="Profile Photo" className="profile-img w-24 h-24 rounded-full object-cover mr-4" />
              <div className="name-title">
                <h1 className="name text-3xl font-bold">{userData.name}</h1>
                <div className="title text-gray-600 text-xl">{userData.title}</div>
              </div>
            </div>

            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">About Me</h2>
              <p className="about-text text-gray-700 text-sm leading-relaxed">{userData.aboutMe}</p>
            </div>

            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">Experience</h2>
              {userData.experience.map((job, index) => (
                <div key={index} className="experience-item mb-4">
                  <div className="date text-gray-600">{job.date}</div>
                  <div className="company font-bold">{job.position}</div>
                  <div className="job-description text-gray-600">{job.company}, {job.location}</div>
                  <ul className="responsibilities list-disc ml-5 text-gray-600 text-sm">
                    {job.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* References Section */}
            <div className="section mb-6">
              <h2 className="section-title uppercase font-bold mb-2">References</h2>
              <div className="references grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                {userData.references.map((ref, index) => (
                  <div key={index} className="reference-item border p-3 rounded-md bg-gray-50 shadow-sm">
                    <span className="reference-name font-bold">{ref.name}</span><br />
                    {ref.position}<br />
                    {ref.contact}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

  

    </Fragment >
  );
};

// Example user data structure
const userData = {
  contact: {
    phone: "+123-456-7890",
    email: "olivia@email.com",
    location: "New York, USA",
    website: "www.website.com"
  },
  education: [
    {
      date: "2015 - 2019",
      degree: "Master's Degree",
      institution: "University Name"
    }
  ],
  skills: ["Project Management", "Team Leadership", "Communication", "Problem Solving", "Strategic Planning", "Data Analysis"],
  languages: ["English (Native)", "Spanish (Fluent)", "French (Basic)"],
  profileImage: "./person.jpg",
  name: "Olivia Sanchez",
  title: "Marketing Manager",
  aboutMe: "Experienced Marketing Manager with a demonstrated history of working in the marketing industry. Skilled in Digital Strategy, Marketing Management, and Team Leadership.",
  experience: [
    {
      date: "Jan 2020 - Present",
      position: "Senior Marketing Manager",
      company: "Company Name",
      location: "Location",
      responsibilities: [
        "Led digital marketing campaigns across multiple platforms",
        "Managed a team of 5 marketing professionals",
        "Increased social media engagement by 150%",
        "Developed and implemented marketing strategies"
      ]
    },
    {
      date: "Jun 2017 - Dec 2019",
      position: "Marketing Specialist",
      company: "Company Name",
      location: "Location",
      responsibilities: [
        "Executed marketing campaigns across various channels",
        "Created content for social media platforms",
        "Analyzed marketing metrics and prepared reports"
      ]
    }
  ],
  references: [
    {
      name: "John Smith",
      position: "Marketing Director",
      contact: "john@email.com"
    },
    {
      name: "Sarah Johnson",
      position: "Senior Manager",
      contact: "sarah@email.com"
    }
  ]
};

export default function App() {
  return (
    <>
      {/* Pass user data as props */}
      <ResumeTemplate userData={userData} />
    </>
  );
}