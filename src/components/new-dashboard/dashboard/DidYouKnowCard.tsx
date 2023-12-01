"use client";
import { bulbIcon } from "@/helpers/iconsProvider";
import { useEffect, useState } from "react";

const resumeQuotes = [
  "Your resume is your first impression.",
  "A well-crafted resume opens doors to opportunities.",
  "A good resume showcases your skills and experience succinctly.",
  "A tailored resume speaks directly to the job you want.",
  "An ATS-friendly resume increases your chances of getting noticed.",
  "ATS resumes match keywords to stand out in digital screening.",
  "An optimized resume navigates the digital hiring process effectively.",
  "An ATS resume is your ticket through the recruiter's gatekeeper.",
];

const DidYouKnowCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === resumeQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-6  border border-gray-200 rounded-lg shadow ">
      <div className="inline-flex gap-2 ">
        <span className="pt-1">{bulbIcon}</span>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight ">
          Did you know?
        </h5>
      </div>
      <p className="mb-3 font-normal text-gray-500">
        {resumeQuotes[currentIndex] && resumeQuotes[currentIndex]}
      </p>
    </div>
  );
};

export default DidYouKnowCard;
