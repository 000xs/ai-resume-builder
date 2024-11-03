import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema using Yup
const schema = yup.object().shape({
  personalDetails: yup.object({
    jobTitle: yup.string().required("Job title is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
  }),
  employmentHistory: yup.array().of(
    yup.object({
      jobTitle: yup.string().required("Job title is required"),
      company: yup.string().required("Company name is required"),
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date().required("End date is required"),
      responsibilities: yup.string().required("Responsibilities are required"),
    })
  ),
  education: yup.array().of(
    yup.object({
      degree: yup.string().required("Degree is required"),
      institution: yup.string().required("Institution is required"),
      graduationDate: yup.date().required("Graduation date is required"),
    })
  ),
  skills: yup.object({
    hardSkills: yup.array().of(yup.string()).required("Please add at least one hard skill"),
    softSkills: yup.array().of(yup.string()).required("Please add at least one soft skill"),
  }),
  certifications: yup.array().of(
    yup.object({
      certificationName: yup.string().required("Certification name is required"),
      issuingOrganization: yup.string().required("Issuing organization is required"),
    })
  ),
  internships: yup.array().of(
    yup.object({
      roleTitle: yup.string().required("Role title is required"),
      company: yup.string().required("Company name is required"),
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date().required("End date is required"),
      responsibilities: yup.string().required("Responsibilities are required"),
    })
  ),
});

const FillInfo = () => {
  const { register, control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      personalDetails: {},
      employmentHistory: [{}],
      education: [{}],
      skills: { hardSkills: [], softSkills: [] },
      certifications: [{}],
      internships: [{}],
    },
  });

  const { fields: employmentFields, append: addEmployment } = useFieldArray({ control, name: "employmentHistory" });
  const { fields: educationFields, append: addEducation } = useFieldArray({ control, name: "education" });
  const { fields: certificationFields, append: addCertification } = useFieldArray({ control, name: "certifications" });
  const { fields: internshipFields, append: addInternship } = useFieldArray({ control, name: "internships" });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    // Implement PDF generation or other next steps here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <h2>Personal Details</h2>
      <div>
        <input {...register("personalDetails.jobTitle")} placeholder="Job Title" />
        <input type="file" {...register("personalDetails.photo")} placeholder="Upload Photo" />
        <input {...register("personalDetails.firstName")} placeholder="First Name" />
        <input {...register("personalDetails.lastName")} placeholder="Last Name" />
        <input {...register("personalDetails.email")} placeholder="Email" />
        <input {...register("personalDetails.phone")} placeholder="Phone" />
        <input {...register("personalDetails.country")} placeholder="Country" />
        <input {...register("personalDetails.city")} placeholder="City" />
      </div>

      <h2>Employment History</h2>
      {employmentFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`employmentHistory.${index}.jobTitle`)} placeholder="Job Title" />
          <input {...register(`employmentHistory.${index}.company`)} placeholder="Company" />
          <input {...register(`employmentHistory.${index}.startDate`)} type="date" placeholder="Start Date" />
          <input {...register(`employmentHistory.${index}.endDate`)} type="date" placeholder="End Date" />
          <textarea {...register(`employmentHistory.${index}.responsibilities`)} placeholder="Responsibilities" />
        </div>
      ))}
      <button type="button" onClick={() => addEmployment({})}>Add Employment</button>

      <h2>Education</h2>
      {educationFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`education.${index}.degree`)} placeholder="Degree" />
          <input {...register(`education.${index}.institution`)} placeholder="Institution" />
          <input {...register(`education.${index}.graduationDate`)} type="date" placeholder="Graduation Date" />
        </div>
      ))}
      <button type="button" onClick={() => addEducation({})}>Add Education</button>

      <h2>Skills</h2>
      <div>
        <input {...register("skills.hardSkills.0")} placeholder="Hard Skill" />
        <input {...register("skills.softSkills.0")} placeholder="Soft Skill" />
      </div>

      <h2>Certifications</h2>
      {certificationFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`certifications.${index}.certificationName`)} placeholder="Certification Name" />
          <input {...register(`certifications.${index}.issuingOrganization`)} placeholder="Issuing Organization" />
        </div>
      ))}
      <button type="button" onClick={() => addCertification({})}>Add Certification</button>

      <h2>Internships</h2>
      {internshipFields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`internships.${index}.roleTitle`)} placeholder="Role Title" />
          <input {...register(`internships.${index}.company`)} placeholder="Company" />
          <input {...register(`internships.${index}.startDate`)} type="date" placeholder="Start Date" />
          <input {...register(`internships.${index}.endDate`)} type="date" placeholder="End Date" />
          <textarea {...register(`internships.${index}.responsibilities`)} placeholder="Responsibilities" />
        </div>
      ))}
      <button type="button" onClick={() => addInternship({})}>Add Internship</button>

      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default FillInfo;
