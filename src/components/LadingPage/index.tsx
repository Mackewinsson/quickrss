import React from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-52">
      <h1 className="text-4xl font-bold text-center">
        Upwork offers every{" "}
        <span className="relative inline-block">
          5 min
          <span className="absolute left-0 right-0 -bottom-1 h-2 bg-[#6fda44] opacity-75"></span>
        </span>{" "}
        in your Slack!
      </h1>
      <p className="mt-4 text-center text-gray-600">
        Be the first to apply and increase your chances of getting the perfect
        job.
      </p>
      <Link href="/api/auth/login" passHref>
        <button className="mt-6 btn btn-primary">Start now</button>
      </Link>
    </div>
  );
};

export default LandingPage;
