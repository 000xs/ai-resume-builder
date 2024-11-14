import Head from "next/head";
import Link from "next/link";
import { FileText, Check } from "lucide-react";
import { Fragment } from "react";
import Navigationbar from "@/components/Navigationbar";

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Create 1 resume",
      "Access to basic templates",
      "Download as PDF",
      "Basic customization options",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99/month",
    features: [
      "Create unlimited resumes",
      "Access to all templates",
      "Download as PDF, Word, TXT",
      "Advanced customization options",
      "Cover letter builder",
      "LinkedIn profile optimization",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "Advanced analytics",
      "Team collaboration tools",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <Fragment>
        <Navigationbar />
      <div className="min-h-screen bg-white">
        <Head>
          <title>Pricing - ResumeGenius</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

         

        <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Pricing Plans
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Choose the perfect plan for your resume-building needs.
            </p>
          </div>

          <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col ${
                  plan.highlighted ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  {typeof plan.price === "string" ? (
                    <p className="mt-4 flex items-baseline text-gray-900">
                      <span className="text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.price !== "Free" && plan.price !== "Custom" && (
                        <span className="ml-1 text-xl font-semibold">
                          /month
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="mt-4 flex items-baseline text-gray-900">
                      <span className="text-5xl font-extrabold tracking-tight">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-xl font-semibold">/month</span>
                    </p>
                  )}
                  <ul className="mt-6 space-y-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <Check
                          className="flex-shrink-0 w-6 h-6 text-green-500"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#"
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.highlighted
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
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
