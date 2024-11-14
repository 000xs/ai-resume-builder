import Head from "next/head";
import Link from "next/link";
import { FileText, Edit, Download, CheckCircle } from "lucide-react";
import { Fragment } from "react";
import Navigationbar from "@/components/Navigationbar";

export default function HowItWorks() {
  return (
    <Fragment>
      <Navigationbar />
      <div className="min-h-screen bg-white">
        <Head>
          <title>How It Works - ResumeGenius</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              How It Works
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Create a professional resume in minutes with our easy-to-use
              platform.
            </p>
          </div>

          <div className="mt-20">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <Edit className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    1. Choose a template
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Select from our wide range of professionally designed
                  templates that suit your industry and experience level.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    2. Fill in your details
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Our AI-powered form guides you through entering your personal
                  information, work experience, education, and skills.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <CheckCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    3. Review and edit
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Preview your resume and make any necessary adjustments. Our
                  platform offers real-time suggestions to improve your content.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <Download className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    4. Download and share
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Download your polished resume in multiple formats (PDF, Word,
                  TXT) or share it directly with potential employers.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/start"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Get Started Now
            </Link>
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
