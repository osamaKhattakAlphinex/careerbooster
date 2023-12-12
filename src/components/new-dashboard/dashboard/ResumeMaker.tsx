"use client";
import ToolsCard from "@/components/ToolsCard";
import chatbot from "@/../public/icon/chatbot.png";
import book from "@/../public/icon/book.png";
import profile from "@/../public/icon/profile.png";
import email from "@/../public/icon/email.png";
import review from "@/../public/icon/review.png";
import bigs from "@/../public/icon/bigs.png";
import letter from "@/../public/icon/letter.png";
import { useState } from "react";
import bagsIcon from "@/../public/icon/bagsIcon.svg";
import scanIcon from "@/../public/icon/scanIcon.svg";

const cardDetail = [
  {
    title: "Resume Builder",
    description:
      "he passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
    link: "/resume-builder",
    icon: book,
    bgColor1: "from-violet-800",
    bgColor2: "to-violet-400",
    action: "launch",
  },
  {
    title: "Generator Cover Letters",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/cover-letter-generator",
    icon: letter,
    bgColor1: "from-yellow-600",
    bgColor2: "to-yellow-400",
    action: "launch",
  },
  {
    title: "Keyword Optimize Your LinkedIn",
    description:
      "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
    link: "/linkedin-generator",
    icon: profile,
    bgColor1: "from-cyan-400",
    bgColor2: "to-blue-600",
    action: "launch",
  },
  {
    title: "Personalized Email Generator",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/email-bot",
    icon: email,
    bgColor1: "from-pink-600",
    bgColor2: "to-orange-700",
    action: "launch",
  },

  {
    title: "Consulting Bids Generator",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/consulting-bids-bot",
    icon: bigs,
    bgColor1: "from-red-600",
    bgColor2: "to-orange-400",
    action: "launch",
  },
  {
    title: "Review Resume by AI",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/",
    icon: review,
    bgColor1: "from-cyan-600",
    bgColor2: "to-sky-300",
    action: "coming soon",
  },
  {
    title: "Career Coach",
    description:
      "From its medieval origins to the digital era, learn everything.",
    link: "/",
    icon: chatbot,
    bgColor1: "from-teal-600",
    bgColor2: "to-green-400",
    action: "coming soon",
  },
  {
    title: "AI Job Finder",
    description:
      "Our AI tool scans the entire web to discover the most relevant and recent opportunities matching your background, saving you from searching multiple job boards.",
    link: "/",
    icon: bagsIcon,
    bgColor1: "from-[#ff0070]",
    bgColor2: "to-[#fd73ff]",
    action: "coming soon",
  },
  {
    title: "ATS Scan Your Resume",
    description:
      "Avoid the pitfalls of Applicant Tracking Systems (ATS) with our ATS scanning feature. Ensure your resume is ATS-friendly, increasing your chances of making it to the recruiter's desk.",
    link: "/",
    icon: scanIcon,
    bgColor1: "from-[#008a04]",
    bgColor2: "to-[#57c84c]",
    action: "coming soon",
  },
];
// { name: "Career Coach", value: "careerCoach" },

const ResumeMaker = () => {
  const [activeTab, setActiveTab] = useState("Career Coach");
  return (
    <div className="lg:px-[20px] px-[12px] pt-2 lg:mt-6">
      <div className="flex lg:flex-row flex-col gap-1 flex-wrap ">
        {cardDetail.map((item, index) => (
          <ToolsCard
            key={index}
            {...item}
            isActive={activeTab === item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeMaker;
