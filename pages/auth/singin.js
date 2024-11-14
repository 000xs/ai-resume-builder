import Navigationbar from "@/components/Navigationbar";
import { account } from "@/utils/appwrite";
import { checkUserStatus, isAuthenticated, loginUser } from "@/utils/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setUser(await account.get());
    };
    getUser();
    console.log(user);
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const err = await loginUser(email, password);
      // setUser(await account.createEmailPasswordSession(email, password));

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

          msgContainer.innerHTML = `Login Successful!  `;
          setTimeout(() => {
            window.location.href = "/profile"; // Redirect to the specified URL
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err.message);
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
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your credentials to access your account
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Enter your email"
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
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  Log In
                </button>
                <div className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/singup"
                    className="text-black hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
