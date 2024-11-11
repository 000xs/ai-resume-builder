import axios from "axios";
import { Fragment, useEffect, useState } from "react"



const Basic = () => {
    
    return (
        <Fragment >
            <<div className="bg-white w-full h-full px-28 py-16 space-y-6">
                <div className="space-y-3">
                    <div className="text-xl font-bold">Tim Stewart, Accountant</div>
                    <div className="text-sm text-gray-700 mb-5">8 Wall Street, New York, NY | USA | (917) 4* 817* | tim.stewart@gmail.com</div>
                </div>
                <div className="mb-5">
                    <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">Profile</div>
                    <p className="text-sm">{summary}</p>
                </div>

                <div className="mb-5">
                    <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">Employment History</div>
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
                            <div className="text-xs font-medium">{job.startDate} — {job.endDate}</div>

                        </div>
                    ))}
                </div>

                <div className="mb-5">
                    <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">Education</div>
                    {userData.Education.map((edu, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex justify-between font-bold">
                                <span>{`${edu.degreeName}`}</span>
                                <span>{edu.start}-{edu.graduation}</span>
                                
                            </div>
                            <div>
                            {edu.institution}
                            </div>
                             
                             
                        </div>
                    ))}
                </div>

                <div className="mb-5">
                    <div className="uppercase text-sm font-bold border-b border-black mb-2 pb-1">Skills</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {skils.map(skill => (
                            <div key={skill} className="flex justify-between"><span>{skill}</span><span>Expert</span></div>
                        ))}
                    </div>
                </div>



            </div>>
        </Fragment>
    )
}

export default Basic