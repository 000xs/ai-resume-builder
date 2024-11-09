// utils/resumeTemplates.js

export const resumeTemplates = {
    template1: (data) => `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            h2 { color: #333; }
            .section { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>${data.personalData.fullname}</h1>
          <div class="section">
            <h2>Contact Information</h2>
            <p>${data.personalData.email} | ${data.personalData.tel}</p>
            <p>${data.personalData.location}</p>
          </div>
          <div class="section">
            <h2>Job Experience</h2>
            <p>${data.JobExperience.jobTitle} at ${data.JobExperience.companyName}</p>
            <p>${data.JobExperience.companyLocation} (${data.JobExperience.datesEmployment})</p>
          </div>
          <div class="section">
            <h2>Skills</h2>
            <ul>${data.Skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
          </div>
          <div class="section">
            <h2>Education</h2>
            ${data.Education.map(edu => `<p>${edu.degree} in ${edu.field} from ${edu.institution} (${edu.year})</p>`).join('')}
          </div>
        </body>
      </html>
    `,
  
    template2: (data) => `
      <html>
        <head>
          <style>
            body { font-family: 'Georgia', serif; margin: 20px; }
            h1 { text-align: center; color: #0070f3; }
            h2 { border-bottom: 1px solid #0070f3; }
          </style>
        </head>
        <body>
          <h1>${data.personalData.fullname}</h1>
          <h2>Contact</h2>
          <p>Email: ${data.personalData.email}</p>
          <p>Phone: ${data.personalData.tel}</p>
  
          <h2>Experience</h2>
          <p>${data.JobExperience.jobTitle}, ${data.JobExperience.companyName} (${data.JobExperience.companyLocation})</p>
  
          <h2>Skills</h2>
          <ul>${data.Skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
  
          <h2>Education</h2>
          ${data.Education.map(edu => `<p>${edu.degree} in ${edu.field}, ${edu.institution} (${edu.year})</p>`).join('')}
        </body>
      </html>
    `,
  
    template3: (data) => `
      <html>
        <head>
          <style>
            body { font-family: 'Courier New', monospace; margin: 20px; }
            h1 { text-align: center; font-size: 24px; }
            h2 { font-size: 20px; }
            .contact, .experience, .skills, .education { margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <h1>${data.personalData.fullname}</h1>
  
          <div class="contact">
            <h2>Contact Information</h2>
            <p>Email: ${data.personalData.email}</p>
            <p>Phone: ${data.personalData.tel}</p>
            <p>Location: ${data.personalData.location}</p>
          </div>
  
          <div class="experience">
            <h2>Experience</h2>
            <p><strong>${data.JobExperience.jobTitle}</strong> at ${data.JobExperience.companyName}, ${data.JobExperience.companyLocation} (${data.JobExperience.datesEmployment})</p>
          </div>
  
          <div class="skills">
            <h2>Skills</h2>
            ${data.Skills.map(skill => `<span style="margin-right: 10px;">${skill}</span>`).join(', ')}
          </div>
  
          <div class="education">
            <h2>Education</h2>
            ${data.Education.map(edu => `<p>${edu.degree} in ${edu.field}, ${edu.institution} (${edu.year})</p>`).join('')}
          </div>
  
        </body>
      </html>`
  };