import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navigationbar from "@/components/Navigationbar";
import { account } from "@/utils/appwrite";
import { logoutUser } from "@/utils/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Simulating fetching user data from an API
    const fetchUser = async () => {
      // In a real application, you would fetch this data from your backend

      setUser(await account.get());
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // In a real application, you would clear the user's session/token here
    // For now, we'll just redirect to the login page
    logoutUser();
    router.push("/auth/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <Navigationbar />
      <div className="min-h-screen bg-white p-4">
        <Head>
          <title>Profile - ResumeGenius</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Personal Information
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Location:</strong> {user.location}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Professional Links
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href={user.linkedin}
                        className="text-blue-600 hover:underline"
                      >
                        {user.linkedin}
                      </a>
                    </p>
                    <p>
                      <strong>Portfolio:</strong>{" "}
                      <a
                        href={user.portfolio}
                        className="text-blue-600 hover:underline"
                      >
                        {user.portfolio}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* This is where you would map through the user's resumes */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">
                      Software Engineer Resume
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Last updated: 2023-05-15
                    </p>
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold mb-2">
                      Project Manager Resume
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Last updated: 2023-04-20
                    </p>
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </div>
                  {/* Add more resume items as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
