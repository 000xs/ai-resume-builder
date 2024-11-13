import React, { Fragment, useEffect, useState } from "react";
import { registerUser } from "@/utils/auth"; // Adjust import as necessary
import Navigationbar from "@/components/Navigationbar";
// Ensure you have an Error component
import Link from "next/link";
import { account } from "@/utils/appwrite";
import Image from "next/image";
// import handler from "../api/generate-content";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState("");
  const handlePhotoChange = (e) => {};

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      // account.createVerification('http://localhost:3000/verify');
      setUser(await account.get());
    };
    getUser();
    console.log(user);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const err = await registerUser(email, password, fullName);

      console.log(err);

      if (err !== null) {
        const errContainer = document.querySelector("#err");
        if (errContainer) {
          const msgContainer = document.querySelector("#msg");
          if (msgContainer) {
            msgContainer.style.display = "none";
          }
          errContainer.style.display = "block";
          errContainer.innerHTML = err;
        }
      }
      if (err === null) {
        setFullName("");
        setEmail("");
        setPassword("");
        // Handler registration succes
        const msgContainer = document.querySelector("#msg");
        const errContainer = document.querySelector("#err");
        if (msgContainer) {
          if (errContainer) {
            errContainer.style.display = "none";
          }
          msgContainer.style.display = "block";
          await account.createEmailPasswordSession(email, password);
          setUser(await account.get());

          msgContainer.innerHTML = `Registration Successful! <a href="/auth/singin">Login Now</a>`;
          setTimeout(() => {
            window.location.href = "/auth/singin"; // Redirect to the specified URL
          }, 2000);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <Fragment>
        <Navigationbar />
        <div className="min-h-screen bg-white p-4 flex items-center justify-center">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-center mb-6">
                You are already logged in
              </p>
              <Link href="/">Go to Home</Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navigationbar />
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your information to get started
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    {photo ? (
                      <Image
                        src={photo}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload profile photo"
                  />
                </div>
              </div>
              <div
                id="err"
                className="w-full hidden bg-red-500 text-sm text-white rounded-md p-4 font-semibold"
              ></div>
              <div
                id="msg"
                className="w-full hidden bg-green-500 text-sm text-white rounded-md p-4 font-semibold"
              ></div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)} // Update state on change
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password" // Change to 'password' type for security
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Create an Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SignupPage;
