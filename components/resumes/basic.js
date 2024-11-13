import { Fragment, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import fetchSummary from "@/utils/fetchSummary";

// Utility function to format date strings
const formatDateString = (dateString) => {
  if (typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return ""; // Return an empty string for invalid input
  }

  const [year, month] = dateString.split("-");
  const date = new Date(year, month - 1); // Month is 0-indexed in JavaScript
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

const Basic = ({ userData }) => {
  const handlePrint = async () => {
    try {
      const element = document.getElementById("content");
      if (!element) {
        throw new Error("Content element not found");
      }

      const opt = {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate PDF
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [skills, setSkills] = useState(userData.Skills || []); // Default to an empty array if undefined
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const getSummary = async () => {
      try {
        const summaryData = await fetchSummary(userData);
        // Split the string by '**'
        const splitSummary = summaryData.summaryText.split("**");

        // Filter out any empty strings from the resulting array
        const formattedSummary = splitSummary.filter(part => part.trim() !== "");
        
        setSummary(formattedSummary.join(""));
        console.log("Fetched Summary:", summaryData.summaryText);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    getSummary();
  }, [userData]);

  return (
    <Fragment>
      <div className="bg-white space-y-6 mb-2" id="content">
        <div className="space-y-3">
          <div>
            <div className="text-xl font-bold">
              {userData.personalData.fullname}
            </div>
            <div className="text-lg font-normal">{userData.role}</div>
          </div>
          <div className="text-sm text-gray-700 mb-5">
            {userData.personalData.location} | {userData.personalData.tel} | {userData.personalData.email}
          </div>
        </div>

        <div className="mb-5">
          <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">
            Profile
          </div>
          <p className="text-sm">{summary}</p>
        </div>

        <div className="mb-5">
          <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">
            Employment History
          </div>
          {userData.JobExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between font-bold mb-1">
                <span>{job.companyName}</span>
                <span>{job.companyLocation}</span>
              </div>
              <div className="w-f">
                <div className="text-xs font-bold">{job.jobTitle}</div>
              </div>
              <div className="text-xs mb-2">{job.description}</div>
              <div className="text-xs font-medium">
                {formatDateString(job.jobStart)} —{" "}
                {formatDateString(job.jobEnd)}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">
            Education
          </div>
          {userData.Education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between font-bold">
                <span>{edu.degreeName}</span>
                <span>
                  {formatDateString(edu.start)} -{" "}
                  {formatDateString(edu.graduation)}
                </span>
              </div>
              <div>{edu.institution}</div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">
            Skills
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {skills.map((skill) => (
              <div key={skill} className="flex justify-between">
                <span>{skill}</span>
                <span>Expert</span> {/* You might want to adjust this based on skill level */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        className="w-full border border-b-4 px-4 border-black hover:border-b py-2" 
        onClick={handlePrint}
      >
        Download Resume
      </button>
    </Fragment>
  );
};

export default Basic;