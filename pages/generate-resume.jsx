import Navigationbar from "@/components/Navigationbar";
import { templates } from "@/data/templates";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FileText, Check, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic';

const GeneratePDF = dynamic(() => import('@/components/GeneratePDF'), { ssr: false });
const CVTemplate = dynamic(() => import('@/components/CVTemplate'), { ssr: false });



const GenerateResume = () => {
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
    jobExperience: {
      jobTitle: '',
      companyName: '',
      companyLocation: '',
      datesEmployment: ''
    },
    skills: [], // Initialize as an empty array
    education: [], // Initialize as an empty array
    template: '1'
  });
  const router = useRouter();
  const { step } = router.query;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const istempleteSelect = step === '1' || !step || !['1', '2', '3', '4', '5', '6'].includes(step) || !step === '2' || !step === '3' || !step === '4' || !step === '5' || !step === '6'
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
  // State variables for education fields
  const initialEducationFields = [
    { degreeName: '', institution: '', graduation: '' },
  ];
  const [educationFields, setEducationFields] = useState(initialEducationFields);

  // Function to handle adding a new education field
  const handleAddField = () => {
    setEducationFields([...educationFields, { degreeName: '', institution: '', graduation: '' }]);
  };

  // Function to handle input changes in education fields
  const handleEduInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...educationFields];
    updatedFields[index][name] = value; // Update the specific field based on the input name
    setEducationFields(updatedFields);

  };
  //personal information
  // const [image] = useState(""); before edcleard
  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [linkindin, setLinkindin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  // Handle input changes for text fields 
  //job experience
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [datesEmployment, setDatesEmployment] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
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
        "JobExperience":
        {
          "jobTitle": jobTitle,
          "companyName": companyName,
          "companyLocation": companyLocation,
          "datesEmployment": datesEmployment
        },
        "Skills": skillsArray,
        "Education": educationFields,
        "Template": selectedTemplate

      }
    )
    // call backend api to create resume

  }
  return (
    <main className="bg-white min-h-screen font-mono">
      <Navigationbar />
      <div className="container border w-auto h-auto mx-28 my-8  justify-center flex">
        {istempleteSelect &&
          <Fragment>
            <div className="container-templete px-4 space-y-4 py-8 flex flex-col items-center w-full">
              <h1 className=" text-xl">Chosee Your templaet</h1>
              <div className="templtes flex flex-grow space-x-6">
                {templates.map(item => (
                  <div key={item.id} className={`border p-4 my-2 ${selectedTemplate === item.id ? "scale-105 border-blue-500" : ""
                    }`}
                    onClick={() => handleTemplateSelect(item)}
                  >
                    <img src={item.previewImage} width={128} height={226} />
                    <h2 className="text-xl">{item.name}</h2>

                  </div>
                ))}
              </div>
              <button className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                onClick={() => router.push(`/generate-resume?step=2&templateId=${selectedTemplate}`)}
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
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt="Profile Image"
                          layout="fill"
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <AiOutlineUpload className="text-gray-400 text-4xl" />
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
            <button className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
              onClick={() => { router.push(`/generate-resume?step=3&templateId=${selectedTemplate}&fullname=${encodeURIComponent(fullname)}&location=${encodeURIComponent(location)}&tel=${encodeURIComponent(tel)}&email=${encodeURIComponent(email)}&linkdin=${encodeURIComponent(linkindin)}&portfolio=${encodeURIComponent(portfolio)}`); }}
            >
              Next
            </button>
          </div>
        </Fragment>}
        {step === '3' && <Fragment>
          <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
            <h1 className=" text-2xl">Skils</h1>
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
              // onClick={() => router.push(`/generate-resume?step=4&templateId=${selectedTemplate}&skils=${skillsArray.join(',')}`)}
              onClick={() => { router.push(`/generate-resume?step=4&templateId=${selectedTemplate}&fullname=${encodeURIComponent(fullname)}&location=${encodeURIComponent(location)}&tel=${encodeURIComponent(tel)}&email=${encodeURIComponent(email)}&linkdin=${encodeURIComponent(linkindin)}&portfolio=${encodeURIComponent(portfolio)}&skils=${skillsArray.join(',')}`); }}
            >
              Next
            </button>
          </div>
        </Fragment>}
        {step === '4' &&
          <Fragment>
            <div className="container-templete px-16 space-y-4 py-10 flex flex-col items-center w-full">
              <h1 className=" text-2xl">Professional Experience</h1>
              <div className="form flex flex-col justify-between  w-[100%]">
                <div className="right flex flex-col  justify-start items-start space-y-4">
                  <div className="w-full">
                    <label htmlFor="fullname" className="font-semibold">Job Title</label>
                    <input type="text" value={jobTitle} onChange={handleInputChange(setJobTitle)} name="Job Title" id="Job Title" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Job Title" required />
                  </div>
                  <div className="w-full">
                    <label htmlFor="c-name" className="font-semibold">Company Name</label>
                    <input type="text" value={companyName} onChange={handleInputChange(setCompanyName)} name="c-name" id="c-name" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Company Name" required />
                  </div>
                  <div className="w-[100%]">
                    <label htmlFor="Location" className="font-semibold">Location</label>
                    <input type="text" value={companyLocation} onChange={handleInputChange(setCompanyLocation)} name="Location" id="Location" className="border rounded-sm border-black px-4  py-1.5 w-[100%] " placeholder="Location" required />
                  </div>
                  <div className="w-[100%]">
                    <label htmlFor="date" className="font-semibold">Dates of Employment (MM/YYYY format)</label>
                    <input type="date" value={datesEmployment} onChange={handleInputChange(setDatesEmployment)} name="date" id="date" className="border rounded-sm border-black px-4 py-1.5 w-[100%]" placeholder="Dates of Employment (MM/YYYY format)" required />
                  </div>
                </div>
              </div>
              <button className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                onClick={() => { router.push(`/generate-resume?step=5&templateId=${selectedTemplate}&fullname=${encodeURIComponent(fullname)}&location=${encodeURIComponent(location)}&tel=${encodeURIComponent(tel)}&email=${encodeURIComponent(email)}&linkdin=${encodeURIComponent(linkindin)}&portfolio=${encodeURIComponent(portfolio)}&skils=${skillsArray.join(',')}&jobTitle=${encodeURIComponent(jobTitle)}&companyName=${encodeURIComponent(companyName)}&companyLocation=${encodeURIComponent(companyLocation)}&datesEmployment=${encodeURIComponent(datesEmployment)}`); }}
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
                      <div className="w-full">
                        <label htmlFor={`graduation${index}`} className="font-semibold">Graduation Date</label>
                        <input
                          type="date"
                          name="graduation"
                          id={`graduation${index}`}
                          className="border rounded-sm border-black px-4 py-1.5 w-full"
                          placeholder="Graduation Date"
                          value={field.graduation}
                          onChange={(e) => handleEduInputChange(index, e)}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    + Add Another Education Entry
                  </button>
                </div>
              </div>

              <button
                className="next bg-transparent border text-md px-4 end-0 border-black border-b-4 py-1 hover:border-b hover:border-t-4"
                onClick={() => {
                  router.push(`/generate-resume?step=6&templateId=${router.query.templateId}`)
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
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-center text-gray-600 mt-8">
                  This may take a few moments. Thank you for your patience!
                </p>
                <CVTemplate userData={userData} />
              </div>
            </div>
          </Fragment>
        )}


      </div>
    </main>
  );
};

export default GenerateResume;