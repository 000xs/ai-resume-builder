import Navigationbar from "@/components/Navigationbar";
import { templates } from "@/data/templates";

import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FileText, Check, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic';
import { checkSession } from "@/utils/auth";
import { account } from "@/utils/appwrite";
import Image from "next/image";
import Head from "next/head";





const Basic = dynamic(() => import('@/components/resumes/basic'), { ssr: false });
const Modern = dynamic(() => import('@/components/resumes/modern'), { ssr: false });
const NextLevel = dynamic(() => import('@/components/resumes/nextlevel'), { ssr: false });
const Pro = dynamic(() => import('@/components/resumes/pro'), { ssr: false });





const GenerateResume = () => {
  const [loggin, setLoggin] = useState(null)
  useEffect(() => {
    const fetchUserData = async () => {
      const session = await checkSession();
      if (session) {
        try {
          const userData = await account.get();
          setLoggin(userData)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not logged in");
      }


    }
    fetchUserData()
  }, [])


  const [userData, setJsonData] = useState({
    personalData: {
      fullname: '',
      image: '',
      location: '',
      tel: '',
      email: '',
      linkindin: '',
      portfolio: ''
    },
    jobExperience: [],
    role: '',
    skills: [],
    education: [],
    template: '1'
  });
  const router = useRouter();
  const { step } = router.query;
  const [selectedTemplate, setSelectedTemplate] = useState(null);


  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const istempleteSelect = step === '1' || !step || !['1', '2', '3', '4', '5', '6', '7'].includes(step) || !step === '2' || !step === '3' || !step === '4' || !step === '5' || !step === '6' || !step === '7'
  const [imageSrc, setImageSrc] = useState('/favicon.ico'); // Default image path

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the image source to the uploaded file
      };
      reader.readAsDataURL(file);
    }
  };
  //job exspresince
  // Job Experience State
  const initialJobFields = [{ jobTitle: '', companyName: '', companyLocation: '', description: '', jobStart: '', jobEnd: '' }];
  const [jobFields, setJobFields] = useState(initialJobFields);

  // Function to handle adding a new job experience field
  const handleJobAddField = () => {
    setJobFields([...jobFields, { jobTitle: '', companyName: '', companyLocation: '', description: '', jobStart: '', jobEnd: '' }]);
  };

  // Function to handle input changes in job experience fields
  const handleJobInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedJobFields = [...jobFields];
    updatedJobFields[index][name] = value; // Update the specific field based on the input name
    setJobFields(updatedJobFields);
  };

  // Education State
  const initialEducationFields = [{ degreeName: '', institution: '', start: '', graduation: '' }];
  const [educationFields, setEducationFields] = useState(initialEducationFields);

  // Function to handle adding a new education field
  const handleEduAddField = () => {
    setEducationFields([...educationFields, { degreeName: '', institution: '', start: '', graduation: '' }]);
  };

  // Function to handle input changes in education fields
  const handleEduInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationFields = [...educationFields];
    updatedEducationFields[index][name] = value; // Update the specific field based on the input name
    setEducationFields(updatedEducationFields);
  };

  //personal information
  // const [image] = useState(""); before edcleard
  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [linkindin, setLinkindin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [role, setRole] = useState('')
  // Handle input changes for text fields 
  const [nextInPersonal, setNextInPersonal] = useState(false);




  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setNextInPersonal(true);
  };

  // Proceed to the next step and pass data as query parameters


  //skils 
  const [skill, setSkill] = useState('');
  const [skillsArray, setSkillsArray] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && skill.trim() !== '') {
      event.preventDefault(); // Prevent form submission
      setSkillsArray([...skillsArray, skill.trim()]); // Add skill to the array
      setSkill(''); // Clear the input field
    }
  };

  const handleDelete = (index) => {
    const newSkillsArray = skillsArray.filter((_, i) => i !== index);
    setSkillsArray(newSkillsArray); // Remove skill from the array
  };
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Analyzing your information',
    'Crafting your professional summary',
    'Organizing your work experience',
    'Highlighting your skills',
    'Polishing your resume'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)

          return 100

        }
        const newProgress = Math.min(oldProgress + 1, 100)
        setCurrentStep(Math.floor((newProgress / 100) * steps.length))
        return newProgress
      })
    }, 50)

    return () => {
      clearInterval(timer)
    }
  }, [])
  //  / Output: January 2023

  const createModernResume = async () => {
    setJsonData(
      {
        "personalData": {
          "fullname": fullname,
          "image": imageSrc,
          "location": location,
          "tel": tel,
          "email": email,
          "linkindin": linkindin,
          "portfolio": portfolio
        },
        "JobExperience": jobFields,
        "role": role,
        "Skills": skillsArray,
        "Education": educationFields,
        "Template": selectedTemplate

      }
    )
    // call backend api to create resume

  }
  return (
    <main className="bg-white min-h-screen font-mono">
      {loggin ? (
        <Fragment>
          <Navigationbar />
          <div className="container border w-auto h-auto mx-28 my-8  justify-center flex">
            {istempleteSelect &&
              <Fragment>
                <Head>
                  <title>Create Resume - ResumeGenius</title>
                  <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                  />
                </Head>
                
                <div className="container-templete px-4 space-y-4 py-8 flex flex-col items-center w-full">
                  <h1 className=" text-xl">Chosee Your templaet</h1>
                  <div className="templtes flex flex-grow space-x-6">
                    {templates.map(item => (
                      <div key={item.id} className={`border p-4 my-2 ${selectedTemplate === item.id ? "scale-105 border-blue-500" : ""
                        }`}
                        onClick={() => handleTemplateSelect(item)}
                      >
                        <img src={item.previewImage} width={186} height={326} />
                        <h2 className="text-xl">{item.name}</h2>

                      </div>
                    ))}
                  </div>
                  <button disabled={!selectedTemplate} className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                    onClick={() => router.push(`/create?step=2&template=${selectedTemplate}`)}
                  >
                    Next
                  </button>
                </div>

              </Fragment>}
            {step === '2' && <Fragment>
              <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
                <h1 className=" text-2xl">Personal Information</h1>
                <div className="form flex flex-col justify-between  w-[100%]">


                  <div className="left flex justify-center items-center">
                    <div className="flex flex-col items-center">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full bg-gray-50 hover:bg-gray-100 transition duration-200">
                          {imageSrc && (
                            <Image
                              src={imageSrc}
                              alt="Profile Image"
                              layout="fill"
                              className="object-cover rounded-full"
                            />
                          )}
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden" // Hide the default file input
                          required
                        />
                      </label>
                      <p className="mt-2 text-sm text-gray-600">Click or drag to upload</p>
                    </div>

                  </div>
                  <div className="right flex flex-col  justify-start items-start space-y-4">
                    <div className="w-full">
                      <label htmlFor="fullname" className="font-semibold">Full Name</label>
                      <input type="text" name="Full Name" value={fullname} onChange={handleInputChange(setFullname)} id="fullname" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Full Name" required />
                    </div>
                    <div className="w-full">
                      <label htmlFor="location" className="font-semibold">Location (city and state)</label>
                      <input type="text" name="location" value={location} onChange={handleInputChange(setLocation)} id="location" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Location (city and state)" required />
                    </div>
                    <div className="w-[100%]">
                      <label htmlFor="tel" className="font-semibold">Phone Number</label>
                      <input type="tel" name="tel" value={tel} onChange={handleInputChange(setTel)} id="tel" className="border rounded-sm border-black px-4  py-1.5 w-[100%] " placeholder="Phone Number" required />

                    </div>
                    <div className="w-[100%]">
                      <label htmlFor="email" className="font-semibold">Email Address</label>
                      <input type="email" name="email" value={email} onChange={handleInputChange(setEmail)} id="email" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Email Adress" required />
                    </div>
                    <div className="w-[100%]">

                      <label htmlFor="linkdin" className="font-semibold">LinkedIn Profile URL (optional)</label>
                      <input type="url" name="linkindin" value={linkindin} onChange={handleInputChange(setLinkindin)} id="linkdin" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder=" LinkedIn Profile URL (optional)" />
                    </div>
                    <div className="w-[100%]">
                      <label htmlFor="portfolio" className="font-semibold">Portfolio URL (optional)</label>
                      <input type="url" value={portfolio} onChange={handleInputChange(setPortfolio)} name="portfolio" id="portfolio" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Portfolio URL (optional)" />
                    </div>
                  </div>
                </div>
                <button disabled={!nextInPersonal} className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                  onClick={() => { router.push(`/create?step=3&template=${selectedTemplate}`); }}
                >
                  Next
                </button>
              </div>
            </Fragment>}
            {step === '3' && <Fragment>
              <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
                <h1 className=" text-2xl">Role & Skils</h1>
                <div className="form flex flex-col justify-between w-full">
                  <label htmlFor="role">Role</label>
                  <input type="text" placeholder="Type Role, ex: Software Engineer"
                    value={role} onChange={handleInputChange(setRole)}
                    className="border rounded-sm border-black px-4 py-1.5 w-full" />
                </div>
                <div className="form flex flex-col justify-between w-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skillsArray.map((skill, index) => (
                      <span key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex items-center">
                        {skill}
                        <button
                          onClick={() => handleDelete(index)}
                          className="ml-2 text-white hover:text-red-400"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <label htmlFor='skills'>Skills</label>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a skill and press Enter"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                  // onClick={() => router.push(`/create?step=4&templateId=${selectedTemplate}&skils=${skillsArray.join(',')}`)}
                  onClick={() => { router.push(`/create?step=4&template=${selectedTemplate}`); }}
                >
                  Next
                </button>
              </div>
            </Fragment>}
            {step === '4' &&
              <Fragment>
                <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
                  <h1 className="text-2xl">Profenoal Exspreince</h1>
                  <div className="form flex flex-col justify-between w-full">
                    <div className="right flex flex-col justify-start items-start space-y-4">
                      {jobFields.map((field, index) => (
                        <div key={index} className="w-full flex flex-col space-y-2 border px-4 py-4">
                          <div className="w-full">
                            <label htmlFor={`jobTitle${index}`} className="font-semibold">Job Title/ Role</label>
                            <input type="text" name="jobTitle" id={`jobTitle${index}`} className="border rounded-sm border-black px-4 py-1.5 w-full" placeholder="Job Title/Role" value={field.jobTitle} onChange={(e) => handleJobInputChange(index, e)} />
                          </div>
                          <div className="w-full">
                            <label htmlFor={`companyName${index}`} className="font-semibold">Company Name</label>
                            <input type="text" name="companyName" id={`companyName${index}`} className="border rounded-sm border-black px-4 py-1.5 w-full" placeholder="Company Name" value={field.companyName} onChange={(e) => handleJobInputChange(index, e)} />
                          </div>
                          <div className="w-full">
                            <label htmlFor={`companyLocation${index}`} className="font-semibold">Company Location</label>
                            <input type="text" name="companyLocation" id={`companyLocation${index}`} className="border rounded-sm border-black px-4 py-1.5 w-full" placeholder="Location" value={field.companyLocation} onChange={(e) => handleJobInputChange(index, e)} />
                          </div>
                          <div className="w-full">
                            <label htmlFor={`description${index}`} className="font-semibold">Description</label>
                            <input type="text" name="description" id={`description${index}`} className="border rounded-sm border-black px-4 py-1.5 h-20 w-full" placeholder="Description" value={field.description} onChange={(e) => handleJobInputChange(index, e)} />
                          </div>
                          <div className="w-full flex flex-row space-x-4">
                            <div className="w-full">
                              <label htmlFor={`jobStart${index}`} className="font-semibold">Start Date</label>
                              <input type="month" name="jobStart" id={`jobStart${index}`} className="border rounded-sm border-black px-4 py-1.5 w-full" value={field.jobStart} onChange={(e) => handleJobInputChange(index, e)} />
                            </div>
                            <div className="w-full">
                              <label htmlFor={`jobEnd${index}`} className="font-semibold">End Date</label>
                              <input type="month" name="jobEnd" id={`jobEnd${index}`} className="border rounded-sm border-black px-4 py-1.5 w-full" value={field.jobEnd} onChange={(e) => handleJobInputChange(index, e)} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleJobAddField}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        + Add  EP Entry
                      </button>
                    </div>
                  </div>

                  <button className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                    onClick={() => { router.push(`/create?step=5&template=${selectedTemplate}`) }}
                  >
                    Next
                  </button>
                </div>

              </Fragment>}
            {step === '5' && (
              <Fragment>
                <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
                  <h1 className="text-2xl">Education</h1>
                  <div className="form flex flex-col justify-between w-full">
                    <div className="right flex flex-col justify-start items-start space-y-4">
                      {educationFields.map((field, index) => (
                        <div key={index} className="w-full flex flex-col space-y-2 border px-4 py-4">
                          <div className="w-full">
                            <label htmlFor={`degreeName${index}`} className="font-semibold">Degree(s) obtained</label>
                            <input
                              type="text"
                              name="degreeName"
                              id={`degreeName${index}`}
                              className="border rounded-sm border-black px-4 py-1.5 w-full"
                              placeholder="Degree(s) obtained"
                              value={field.degreeName}
                              onChange={(e) => handleEduInputChange(index, e)}
                            />
                          </div>
                          <div className="w-full">
                            <label htmlFor={`institution${index}`} className="font-semibold">Institution Name</label>
                            <input
                              type="text"
                              name="institution"
                              id={`institution${index}`}
                              className="border rounded-sm border-black px-4 py-1.5 w-full"
                              placeholder="Institution Name"
                              value={field.institution}
                              onChange={(e) => handleEduInputChange(index, e)}
                            />
                          </div>
                          <div className="w-full flex flex-row space-x-4">

                            <div className="w-full">
                              <label htmlFor={`start${index}`} className="font-semibold">Start Date</label>
                              <input
                                type="month"
                                name="start"
                                id={`start${index}`}
                                className="border rounded-sm border-black px-4 py-1.5 w-full"
                                placeholder="Start Date"
                                value={field.start}
                                onChange={(e) => handleEduInputChange(index, e)}
                              />
                            </div>
                            <div className="w-full">
                              <label htmlFor={`graduation${index}`} className="font-semibold">Graduation Date</label>
                              <input
                                type="month"
                                name="graduation"
                                id={`graduation${index}`}
                                className="border rounded-sm border-black px-4 py-1.5 w-full"
                                placeholder="Graduation Date"
                                value={field.graduation}
                                onChange={(e) => handleEduInputChange(index, e)}
                              />
                            </div>
                          </div>

                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleEduAddField}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        + Add Another Education Entry
                      </button>
                    </div>
                  </div>

                  <button
                    className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                    onClick={() => {
                      router.push(`/create?step=6&template=${selectedTemplate}`)
                      createModernResume()
                    }}
                  >
                    Next
                  </button>
                </div>
              </Fragment>
            )}
            {step === '6' && (
              <Fragment>
                <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4">
                  <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Resume</h1>
                      <p className="text-gray-600">Please wait while we create your professional resume</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="mb-4">
                        <div className="h-2 bg-purple-100 rounded-full">
                          <div
                            className="h-2 bg-purple-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {steps.map((step, index) => (
                          <div key={index} className="flex items-center">
                            {index < currentStep ? (
                              <Check className="w-5 h-5 text-green-500 mr-3" />
                            ) : index === currentStep ? (
                              <Loader2 className="w-5 h-5 text-purple-600 animate-spin mr-3" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3"></div>
                            )}
                            <span className={index <= currentStep ? 'text-gray-900' : 'text-gray-400'}>
                              {step}
                            </span>
                            {router.push(`/create?step=7&template=${selectedTemplate}`)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-center text-gray-600 mt-8">
                      This may take a few moments. Thank you for your patience!
                    </p>
                    {/* <CVTemplate userData={userData} /> */}

                    {/* <Modern userData={userData} /> */}
                    {/* // <NextLevel userData={userData} /> */}


                  </div>
                </div>
              </Fragment>
            )}
            {step === '7' && (
              //return template
              <Fragment>
                {userData.Education && userData.JobExperience && (
                  <div className="flex flex-col space-y-4 p-4" >
                    <h1 className=" text-2xl font-bold">Template</h1>
                    <p>Scroll Bottm to Downlode</p>

                    {
                      router.query.template === '1' && (
                        <Basic userData={userData} />
                      )
                    }
                    {
                      router.query.template === '2' && (
                        <Modern userData={userData} />
                      )
                    }
                    {
                      router.query.template === '3' && (
                        <NextLevel userData={userData} />
                      )
                    }
                    {
                      router.query.template === '4' && (
                        <Pro userData={userData} />

                      )
                    }
                    {
                      router.query.template != '1' || selectedTemplate != '2' || selectedTemplate != '3' || selectedTemplate != '4' && (
                        <div>
                          no

                          {alert(selectedTemplate)}
                        </div>
                      )
                    }

                  </div>
                )}
                {!userData.Education && !userData.JobExperience && (
                  <div>
                    {router.replace('/create?step=1')}
                  </div>
                )}
              </Fragment>

            )}


          </div>
        </Fragment>

      ) : (
        <Fragment>
          <Navigationbar />
          <div className="w-full font-sans space-y-2 h-full bg-white flex items-center flex-col p-28 justify-center">
            <h1 className="text-2xl font-bold">User Not Logged!</h1>
            <p 
            onClick={() => router.push('/auth/singin')}
            className="hover:underline font-semibold">Pleas Login Click This!</p>

          </div>
        </Fragment>
      )}

    </main>
  );
};

export default GenerateResume;