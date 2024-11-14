import Head from 'next/head'
import Link from 'next/link'
import { FileText, Users, Download } from 'lucide-react'
import Navigationbar from '@/components/Navigationbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ResumeGenius - Create Professional Resumes</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-white shadow-sm">
        <Navigationbar />
      </header>

      <main>
        <div className="bg-purple-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Create</span>
                  <span className="block text-purple-600">professional</span>
                  <span className="block">resumes</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Our AI-powered builder ensures your resume stands out.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/create" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10">
                      START NOW
                    </Link>
                    <Link href="/create" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      TRY DEMO
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img
                      className="w-full"
                      src="/ui.png"
                      alt="Resume example"
                    />
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <svg className="h-20 w-20 text-purple-500" fill="currentColor" viewBox="0 0 84 84">
                        <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                        <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Active users</h3>
                <p className="mt-2 text-3xl font-extrabold text-purple-600">1M+</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Resumes generated</h3>
                <p className="mt-2 text-3xl font-extrabold text-purple-600">5TB+</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Cover letters created</h3>
                <p className="mt-2 text-3xl font-extrabold text-purple-600">6M+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Get your free resume
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Start building your career today
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/create" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                Create
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/get-started" className="text-gray-400 hover:text-gray-500">
              Get Started
            </Link>
            <Link href="/our-vision" className="text-gray-400 hover:text-gray-500">
              Our Vision
            </Link>
            <Link href="/our-mission" className="text-gray-400 hover:text-gray-500">
              Our Mission
            </Link>
            <Link href="/opportunities" className="text-gray-400 hover:text-gray-500">
              Opportunities
            </Link>
            <Link href="/get-in-touch" className="text-gray-400 hover:text-gray-500">
              Get in Touch
            </Link>
            <Link href="/inspiring" className="text-gray-400 hover:text-gray-500">
              Inspiring
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} ResumeGenius. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}