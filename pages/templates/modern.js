import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const Modern = () => {
    const userData = {
        personalData: {
            fullname: "John Doe",
            location: "New York, NY",
            tel: "+1 234 567 8901",
            email: "john.doe@example.com",
            linkedin: "https://www.linkedin.com/in/johndoe",
            portfolio: "https://johndoe.com"
        },
        JobExperience: [
            {
                companyName: "Tech Solutions Inc.",
                jobTitle: "Software Engineer",
                companyLocation: "Sri Lanka",
                startDate: "June 2020",
                endDate: "Present",
                description: "Developed and maintained web applications using React and Node.js."
            }
        ],
        Skills: ["HTML", "CSS", "JavaScript"],
        Education: [
            {
                degreeName: "Bachelor of Science in Computer Science",
                institution: "University of Example",
                start: "2020",
                graduation: "2024"
            }
        ],
    };

    

    return (
        <Fragment>
            
          
        </Fragment>
    );
};

export default Modern;