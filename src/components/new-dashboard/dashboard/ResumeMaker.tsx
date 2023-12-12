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
      "Create multiple AI-Powered resumes tailored for your targeted job positions.",
    link: "/resume-builder",
    icon: book,
    bgColor1: "from-violet-800",
    bgColor2: "to-violet-400",
    action: "launch",
  },
  {
    title: "Generator Cover Letters",
    description:
      "Tailor cover letters for each application, skyrocketing your interview chances.",
    link: "/cover-letter-generator",
    icon: letter,
    bgColor1: "from-yellow-600",
    bgColor2: "to-yellow-400",
    action: "launch",
  },
  {
    title: "Keyword Optimize Your LinkedIn",
    description:
      "Boost LinkedIn visibility by optimizing your linkedin for recruiters.",
    link: "/linkedin-generator",
    icon: profile,
    bgColor1: "from-cyan-400",
    bgColor2: "to-blue-600",
    action: "launch",
  },
  {
    title: "Personalized Email Generator",
    description:
      "Boost chances with AI-crafted emails and follow-ups for a standout impression.",
    link: "/email-bot",
    icon: email,
    bgColor1: "from-pink-600",
    bgColor2: "to-orange-700",
    action: "launch",
  },

  {
    title: "Consulting Bids Generator",
    description: "Generate bids in seconds to secure your next consulting gig.",
    link: "/consulting-bids-bot",
    icon: bigs,
    bgColor1: "from-red-600",
    bgColor2: "to-orange-400",
    action: "launch",
  },
  {
    title: "Review Resume by AI",
    description:
      "AI analyzes your resume, offering valuable suggestions for impactful improvements.",
    link: "/",
    icon: review,
    bgColor1: "from-cyan-600",
    bgColor2: "to-sky-300",
    action: "coming soon",
  },
  {
    title: "Career Coach",
    description:
      "Empower your career with AI-driven insights by our career coach for strategic moves.",
    link: "/",
    icon: chatbot,
    bgColor1: "from-teal-600",
    bgColor2: "to-green-400",
    action: "coming soon",
  },
  {
    title: "AI Job Finder",
    description: `Our AI finds fitting job matches across the web, saving you from multiple board searches.`,
    link: "/",
    icon: bagsIcon,
    bgColor1: "from-[#ff0070]",
    bgColor2: "to-[#fd73ff]",
    action: "coming soon",
  },
  {
    title: "ATS Scan Your Resume",
    description:
      "Maximize your resume's ATS compatibility to reach recruiters hassle-free.",
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
    <div className="lg:px-[20px] pt-2 px-[12px] lg:mt-2">
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
