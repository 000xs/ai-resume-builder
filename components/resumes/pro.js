import { MapPin, Mail, Phone, Globe } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import fetchSummary from "@/utils/fetchSummary";

// Utility function to format date strings
const formatDateString = (dateString) => {
  if (typeof dateString !== "string") {
    console.error("Invalid date string:", dateString);
    return dateString; // Return an empty string or a default value
  }

  const [year, month] = dateString.split("-");
  const date = new Date(year, month - 1); // Month is 0-indexed in JavaScript
  return date.toLocaleString("default", { year: "numeric" });
};

export default function Pro({ userData }) {
  const [skills, setSkills] = useState(userData.Skills);
  const [summary, setSummary] = useState("");

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
        jsPDF: { unit: "in", format: "letter" },
      };

      // Generate PDF
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

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
    <Fragment>
      <div id="content" className="grid grid-cols-1 md:grid-cols-12">
        {/* Left Column */}
        <div className="bg-zinc-800 p-8 md:col-span-5 relative">
          {/* Profile Image */}
          <div className="relative mb-8">
            <div
              className="absolute inset-0 bg-amber-500"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
            />
            <div className="relative h-48 w-48 mx-auto overflow-hidden rounded-full border-4 border-white">
              <img
                src={userData.personalData.image || "/favicon.ico"}
                alt={userData.personalData.fullname}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="flex items-center text-amber-500 font-bold mb-4">
              <span className="mr-2">●</span> CONTACT ME
            </h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>{userData.personalData.tel}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>{userData.personalData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span>{userData.personalData.portfolio}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>{userData.personalData.location}</span>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="flex items-center text-amber-500 font-bold mb-4">
              <span className="mr-2">●</span> EDUCATION
            </h2>
            <div className="space-y-4 text-gray-300">
              {userData.Education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold">{edu.institution}</h3>
                  <p>{edu.degreeName}</p>
                  <p>
                    {formatDateString(edu.start)} -{" "}
                    {formatDateString(edu.graduation)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-8 md:col-span-7">
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-4xl font-bold mb-2">
              {userData.personalData.fullname.toUpperCase()}
            </h1>
            <p className="text-gray-600 text-xl">{userData.role}</p>
          </div>

          {/* About Me Section */}
          <div className="mb-8">
            <h2 className="flex items-center font-bold mb-4">
              <span className="text-amber-500 mr-2">●</span> ABOUT ME
            </h2>
            {/* Ensure summary is a string before rendering */}
            <p className="text-gray-600">{summary}</p>
          </div>

          {/* Job Experience Section */}
          <div className="mb-8">
            <h2 className="flex items-center font-bold mb-4">
              <span className="text-amber-500 mr-2">●</span> JOB EXPERIENCE
            </h2>
            <div className="space-y-4">
              {userData.JobExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold">{job.jobTitle}</h3>
                    <span className="text-gray-600">
                      {formatDateString(job.jobStart)} -{" "}
                      {formatDateString(job.jobEnd)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {job.companyName}, {job.companyLocation}
                  </p>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="flex items-center font-bold mb-4">
              <span className="text-amber-500 mr-2">●</span> SKILLS
            </h2>
            {skills.map((skill, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="w-full border border-b-4 px-4 border-black hover:border-b py-2"
        onClick={handlePrint}
      >
        Downlode Resume
      </button>
    </Fragment>
  );
}
