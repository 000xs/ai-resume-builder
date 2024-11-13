import { account } from "@/utils/appwrite";
import { checkSession } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FileText, Users, Download } from 'lucide-react'

const Navigationbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await checkSession();
      if (session) {
        try {
          const userData = await account.get();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not logged in");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row justify-between py-6 px-28 border-b align-middle items-center bg-white">
      <div
        className="icon text-black font-bold text-xl flex flex-row items-center space-x-1 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FileText className="h-8 w-8 text-black" /> ResumeGinues
      </div>
      <ul className="item flex space-x-6 ">
        <li
          className="hover:border-b-2 hover:border-b-black hover:cursor-pointer"
          onClick={() => router.push("/create")}
        >
          Get
        </li>
        <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">
          How it works
        </li>
        <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">
          FAQ
        </li>
        <li className="hover:border-b-2 hover:border-b-black hover:cursor-pointer">
          Pricing
        </li>
      </ul>
      {user ? (
        <div className="cta">
          <button
            type="button"
            className="bg-transparent border border-black hover:cursor-pointer px-4 py-1.5 font-semibold border-b-4 border-b-black"
            onClick={() => router.push("/profile")} // Navigate to profile page
          >
            Profile
          </button>
        </div>
      ) : (
        <div className="cta">
          <button
            type="button"
            className="bg-transparent border border-black hover:cursor-pointer px-4 py-1.5 font-semibold border-b-4 border-b-black"
            onClick={() => router.push("/auth/singin")} // Navigate to login page
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigationbar;
