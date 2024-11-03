// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-8">Welcome to the AI Resume Builder</h1>
      <Link href="/select-template">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold">
          Get Started
        </button>
      </Link>
    </div>
  );
}
