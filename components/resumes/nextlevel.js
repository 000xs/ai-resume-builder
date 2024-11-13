import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import fetchSummary from "@/utils/fetchSummary";

// Utility function to format date strings
// Utility function to format date strings
const formatDateString = (dateString) => {
  if (typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return dateString; // Return an empty string or a default value
  }

  const [year, month] = dateString.split("-");
  const date = new Date(year, month - 1); // Month is 0-indexed in JavaScript
  return date.toLocaleString("default",{ year: "numeric" });
};

const NextLevel = ({ userData }) => {
  const handlePrint = async () => {
    try {
      const element = document.getElementById("content");
      if (!element) {
        throw new Error("Content element not found");
      }

      const opt = {
        margin: 0,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter"},
      };

      // Generate PDF
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [skills, setSkills] = useState(userData.Skills);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const getSummary = async () => {
      try {
        const summaryData = await fetchSummary(userData);
        // Split the string by '**'
        const splitSummary = summaryData.summaryText.split("**");

        // Filter out any empty strings from the resulting array
        const formattedSummary = splitSummary.filter(
          (part) => part.trim() !== ""
        );

        setSummary(formattedSummary.join(""));
        console.log("Fetched Summary:", summaryData.summaryText);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    getSummary();
  }, [userData]);
  return (
    <Fragment className="flex flex-col">
      <div id="content" className="resume w-full max-w-4xl bg-white grid grid-cols-1 md:grid-cols-3 shadow-lg">
        <div className="left-column bg-gray-800 text-white space-y-4 p-6">
          <div className="section ">
            <h2 className="section-title uppercase font-bold mb-2">Contact</h2>
            <ul className="contact-info list-none space-y-2">
              <li className="text-gray-400 text-sm">📱 {userData.personalData.tel}</li>
              <li className="text-gray-400 text-sm">📧 {userData.personalData.email}</li>
              <li className="text-gray-400 text-sm">📍 {userData.personalData.location}</li>
              <li className="text-gray-400 text-sm">🌐 {userData.personalData.portfolio}</li>
            </ul>
          </div>

          <div className="section mb-6">
            <h2 className="section-title uppercase font-bold mb-2">
              Education
            </h2>
            {userData.Education.map((edu, index) => (
              <div key={index} className="education-item mb-4">
                <div className="date text-gray-400 text-sm">
                  {formatDateString(edu.start)} - {formatDateString(edu.graduation)}
                </div>
                <div className="company text-lg font-semibold">{edu.degreeName}</div>
                <div className="job-description text-sm text-gray-400">{edu.institution}</div>
              </div>
            ))}
          </div>

          <div className="section mb-6">
            <h2 className="section-title uppercase font-bold mb-2">Skills</h2>
            <ul className="skills-list list-none">
              {skills.map((skill, index) => (
                <li className="text-gray-400" key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="section mb-6">
            <h2 className="section-title uppercase font-bold mb-2">Language</h2>
            <ul className="language-list list-none">
              <li  className="text-gray-400">English</li>
            </ul>
          </div>
        </div>

        <div className="right-column p-6 bg-white md:col-span-2">
          <div className="profile-section flex items-center mb-6">
            <img
              src={userData.personalData.image}
              alt="Profile Photo"
              className="profile-img w-24 h-24 rounded-full object-cover mr-4"
            />
            <div className="name-title">
              <h1 className="name text-3xl font-bold">
                {userData.personalData.fullname}
              </h1>
              <div className="title text-gray-600 text-xl">{userData.role}</div>
            </div>
          </div>

          <div className="section mb-6">
            <h2 className="section-title uppercase font-bold mb-2">About Me</h2>
            <p className="about-text text-gray-700 text-sm leading-relaxed">
                {summary}
            </p>
          </div>

          <div className="section mb-6">
            <h2 className="section-title uppercase font-bold mb-2">
              Experience
            </h2>
            {userData.JobExperience.map((job, index) => (
              <div key={index} className="experience-item mb-4">
                <div className="date text-gray-600">
                  {formatDateString(job.jobStart)} - {formatDateString(job.jobEnd)}
                </div>
                <div className="company font-bold">{job.jobTitle}</div>
                <div className="job-description text-gray-600">
                  {job.companyName}, {job.companyLocation}
                </div>
                <ul className="responsibilities list-disc ml-5 text-gray-600 text-sm">
                  {job.description
                    .split("\n")
                    .map(
                      (resp, respIndex) =>
                        resp && <li key={respIndex}>{resp}</li>
                    )}
                </ul>
              </div>
            ))}
          </div>

          {/* Uncomment if you want to include references */}
          {/* 
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
          */}
        </div>
      </div>
      <button className="w-full border border-b-4 px-4 border-black hover:border-b py-2" onClick={handlePrint}>Downlode Resume</button>
    </Fragment>
  );
};

export default NextLevel;
