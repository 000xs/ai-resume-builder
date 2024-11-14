import Head from "next/head";
import Link from "next/link";
import { FileText, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";
import Navigationbar from "@/components/Navigationbar";

const faqs = [
  {
    question: "How does ResumeGenius work?",
    answer:
      "ResumeGenius uses AI-powered technology to help you create a professional resume in minutes. Simply choose a template, fill in your details, and our system will format and optimize your resume for you.",
  },
  {
    question: "Is ResumeGenius free to use?",
    answer:
      "We offer both free and premium plans. Our free plan allows you to create and download a basic resume. Premium plans offer additional features such as multiple templates, cover letter creation, and direct sharing with employers.",
  },
  {
    question: "Can I edit my resume after creating it?",
    answer:
      "Yes, you can edit your resume at any time. Simply log into your account, select the resume you want to edit, and make your changes. Your resume will be updated in real-time.",
  },
  {
    question: "What file formats can I download my resume in?",
    answer:
      "You can download your resume in PDF, Word (DOCX), and plain text (TXT) formats. This ensures compatibility with various application systems and employer preferences.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we take data security very seriously. All your personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('') ;

  return (
    <Fragment>
        <Navigationbar />
      <div className="min-h-screen bg-white">
        <Head>
          <title>FAQ - ResumeGenius</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find answers to common questions about ResumeGenius.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-6 divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="pt-6">
                  <dt className="text-lg">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="text-left w-full flex justify-between items-start text-gray-400"
                    >
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDown
                          className={`h-6 w-6 transform ${
                            openIndex === index ? "-rotate-180" : "rotate-0"
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </dt>
                  {openIndex === index && (
                    <dd className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </main>

        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <Link
                href="/get-started"
                className="text-gray-400 hover:text-gray-500"
              >
                Get Started
              </Link>
              <Link
                href="/our-vision"
                className="text-gray-400 hover:text-gray-500"
              >
                Our Vision
              </Link>
              <Link
                href="/our-mission"
                className="text-gray-400 hover:text-gray-500"
              >
                Our Mission
              </Link>
              <Link
                href="/opportunities"
                className="text-gray-400 hover:text-gray-500"
              >
                Opportunities
              </Link>
              <Link
                href="/get-in-touch"
                className="text-gray-400 hover:text-gray-500"
              >
                Get in Touch
              </Link>
              <Link
                href="/inspiring"
                className="text-gray-400 hover:text-gray-500"
              >
                Inspiring
              </Link>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; {new Date().getFullYear()} ResumeGenius. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}
