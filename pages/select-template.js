// pages/select-template.js
import React, { useState } from "react";
import { templates } from "../data/templates";
import Link from "next/link";

const SelectTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Select a Resume Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 border rounded-lg cursor-pointer transition-transform transform ${
              selectedTemplate === template.id ? "scale-105 border-blue-500" : ""
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            <img
              src={template.previewImage}
              alt={`${template.name} Template`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href={{ pathname: "/fill-info", query: { templateId: selectedTemplate } }}>
          <button
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg"
            disabled={!selectedTemplate}
          >
            Continue with Selected Template
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectTemplate;
