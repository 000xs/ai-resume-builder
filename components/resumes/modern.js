
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
    const date = new Date(year); // Month is 0-indexed in JavaScript
    return date.toLocaleString("default", { year: "numeric" });
};
const Modern = ({ userData }) => {

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
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
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
        <Fragment>

            <div id="content" className="resume w-full   bg-white  grid grid-cols-1 md:grid-cols-3">
                <div className="left-column bg-gray-800 text-white p-6">
                    <div className="profile-img mb-6">
                        <img
                            src={userData.personalData.image}
                            alt="Profile Photo"
                            className="w-48 h-48 rounded-full mx-auto"
                        />
                    </div>
                    <div className="contact-info mb-6">
                        <h2 className="text-2xl font-bold mb-4">Contact</h2>
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="text-sm">{userData.personalData.tel}</p>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-sm">{userData.personalData.email}</p>
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-sm">{userData.personalData.location}</p>
                    </div>
                    <div className="education-section mb-6">
                        <h2 className="text-xl font-bold mb-4">Education</h2>
                        {userData.Education.map((edu, index) => (
                            <div key={index} className="education-item mb-4">
                                <p>
                                    {formatDateString(edu.start)} —{" "}
                                    {formatDateString(edu.graduation)}
                                </p>
                                <h3 className="font-semibold">{edu.degreeName}</h3>
                                <p>{edu.institution}</p>
                            </div>
                        ))}
                    </div>
                    <div className="expertise-section mb-6">
                        <h2 className="text-xl font-bold mb-4">Expertise</h2>
                        <ul className="list-disc pl-5">
                            {skills.map((skill, index) => (
                                <li key={index} className="text-sm">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="right-column p-6 md:col-span-2">
                    <div className="header mb-6">
                        <h1 className="text-3xl text-gray-800 font-bold">
                            {userData.personalData.fullname}
                        </h1>
                        <h2 className="text-xl text-gray-600 mb-2">Software Engineer</h2>
                        <p>{summary}</p> {/* Summary fetched from API */}
                    </div>

                    <div className="experience-section mb-6">
                        <h2 className="text-xl font-bold mb-4">Experience</h2>
                        {userData.JobExperience.map((job, index) => (
                            <div key={index} className="experience-item relative mb-4 pl-5">
                                <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gray-800"></span>
                                <div className="date text-gray-600">
                                    {formatDateString(job.jobStart)} - {formatDateString(job.jobEnd)}
                                </div>
                                <div className="company text-gray-600">
                                    {job.companyName} | {job.companyLocation}
                                </div>
                                <div className="position font-semibold text-gray-800">
                                    {job.jobTitle}
                                </div>
                                <p className="text-gray-600">{job.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Additional sections like references can be added here */}
                </div>
            </div>

            <button className="w-full border border-b-4 px-4 border-black hover:border-b py-2" onClick={handlePrint}>Downlode Resume</button>

            {/* Add corresponding Tailwind CSS styles for layout */}
        </Fragment>
    );
};

export default Modern;
