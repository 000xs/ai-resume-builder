// components/CVTemplate.js
import React from "react";
import html2pdf from "html2pdf.js";

const CVTemplate = ({ userData }) => {
  const handlePrint = async () => {
    try {
      const element = document.getElementById("content");
      if (!element) {
        throw new Error("Content element not found");
      }

      const opt = {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate PDF
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div>
      <div id="content" style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <img src={userData.personalData.image} alt="" srcset="" />
        <h1>{userData.personalData.fullname}</h1>
        <p>{userData.personalData.location}</p>
        <p>Tel: {userData.personalData.tel}</p>
        <p>
          Email:{" "}
          <a href={`mailto:${userData.personalData.email}`}>
            {userData.personalData.email}
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href={userData.personalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.personalData.linkedin}
          </a>
        </p>
        <p>
          Portfolio:{" "}
          <a
            href={userData.personalData.portfolio}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData.personalData.portfolio}
          </a>
        </p>
        {userData.jobExperience && (
          <section>
            <h2>Job Experience</h2>
            <h3>{userData.jobExperience.jobTitle || "N/A"}</h3>
            <p>
              {userData.jobExperience.companyName || "N/A"},{" "}
              {userData.jobExperience.companyLocation || "N/A"}
            </p>
            <p>{userData.jobExperience.datesEmployment || "N/A"}</p>
          </section>
        )}
        {/* // In your CVTemplate component */}
        <h2>Skills</h2>
        <ul>
          {userData.skills && userData.skills.length > 0 ? (
            userData.skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills provided.</li> // Fallback if no skills are available
          )}
        </ul>
        <section>
          <h2>Education</h2>
          {Array.isArray(userData.education) &&
          userData.education.length > 0 ? (
            userData.education.map((edu, index) => (
              <div key={index}>
                <h3>{edu.degreeName || "No Degree Provided"}</h3>
                <p>
                  {edu.institution || "No Institution Provided"} - Graduated on{" "}
                  {edu.graduation || "No Graduation Date Provided"}
                </p>
              </div>
            ))
          ) : (
            <p>No education information provided.</p> // Fallback message
          )}
        </section>
      </div>
      <button onClick={handlePrint}>Generate PDF</button>
    </div>
  );
};

export default CVTemplate;
