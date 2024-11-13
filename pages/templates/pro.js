// import { Progress } from "@/components/ui/progress"; // Uncomment if you have a Progress component
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function Resume() {
    const userData = {
        personalData: {
            fullname: 'Olivia Sanchez',
            image: 'person.jpg', // Path to the profile image
            location: 'New York, USA',
            tel: '+123-456-7890',
            email: 'olivia@email.com',
            linkedin: 'https://www.linkedin.com/in/olivia-sanchez',
            portfolio: 'https://www.website.com'
        },
        jobExperience: [
            {
                jobTitle: 'Senior Marketing Manager',
                companyName: 'Tech Innovations Inc.',
                companyLocation: 'New York, NY',
                description: [
                    'Led digital marketing campaigns across multiple platforms',
                    'Managed a team of 5 marketing professionals',
                    'Increased social media engagement by 150%',
                    'Developed and implemented marketing strategies'
                ],
                jobStart: 'Jan 2020',
                jobEnd: 'Present'
            },
            {
                jobTitle: 'Marketing Specialist',
                companyName: 'Creative Solutions LLC',
                companyLocation: 'Boston, MA',
                description: [
                    'Executed marketing campaigns across various channels',
                    'Created content for social media platforms',
                    'Analyzed marketing metrics and prepared reports'
                ],
                jobStart: 'Jun 2017',
                jobEnd: 'Dec 2019'
            }
        ],
        role: 'Marketing Manager',
        skills: [
            { name: "Project Management", level: 90 },
            { name: "Team Leadership", level: 85 },
            { name: "Communication", level: 80 },
            { name: "Problem Solving", level: 75 },
            { name: "Strategic Planning", level: 70 },
            { name: "Data Analysis", level: 80 }
        ],
        education: [
            {
                degreeName: "Master's Degree in Marketing",
                institution: "University of New York",
                start: "2015",
                graduation: "2019"
            }
        ],
        aboutMe:
            "Experienced Marketing Manager with a demonstrated history of working in the marketing industry. Skilled in Digital Strategy, Marketing Management, and Team Leadership.",
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

    // Example of how you might use this data in your component
    console.log(userData);
    return (
        <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Column */}
            <div className="bg-zinc-800 p-8 md:col-span-5 relative">
                {/* Profile Image */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-amber-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} />
                    <div className="relative h-48 w-48 mx-auto overflow-hidden rounded-full border-4 border-white">
                        <img
                            src={userData.personalData.image || "/placeholder.svg?height=200&width=200"}
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
                        {userData.education.map((edu, index) => (
                            <div key={index}>
                                <h3 className="font-bold">{edu.institution}</h3>
                                <p>{edu.degreeName}</p>
                                <p>{edu.start} - {edu.graduation}</p>
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
                    <p className="text-gray-600">{userData.aboutMe}</p>
                </div>

                {/* Job Experience Section */}
                <div className="mb-8">
                    <h2 className="flex items-center font-bold mb-4">
                        <span className="text-amber-500 mr-2">●</span> JOB EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                        {userData.jobExperience.map((job, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <h3 className="font-bold">{job.jobTitle}</h3>
                                    <span className="text-gray-600">{job.jobStart} - {job.jobEnd}</span>
                                </div>
                                <p className="text-gray-600 mb-2">{job.company}, {job.companyLocation}</p>
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
                    {userData.skills.map((skill, index) => (
                        <div key={index} className="flex justify-between mb-2">
                            <span>{skill.name}</span>
                            {/* Uncomment below if you have a Progress component */}
                            {/*<Progress value={skill.level} />*/}
                            {/* Assuming skill.level is a percentage */}
                            {/*<span>{skill.level}%</span>*/}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}