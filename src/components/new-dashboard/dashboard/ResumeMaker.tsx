"use client"
import ToolsCard from "@/components/new-dashboard/ToolsCard";
import chatbot from "@/../public/Ai tools/icon/chatbot.png";
import book from "@/../public/Ai tools/icon/book.png";
import profile from "@/../public/Ai tools/icon/profile.png";
import email from "@/../public/Ai tools/icon/email.png";
import review from "@/../public/Ai tools/icon/review.png";
import bigs from "@/../public/Ai tools/icon/bigs.png";
import letter from "@/../public/Ai tools/icon/letter.png";
import { useState } from "react";
const cardDetail = [
  {
    title: "Career Coach",
    description:
      "From its medieval origins to the digital era, learn everything.",
    link: "/resume-maker",
    icon: chatbot,
    bgColor1: "from-teal-600",
    bgColor2: "to-green-400",
  },
  {
    title: "Resume Builder",
    description:
      "he passage is attributed to an unknown typesetter in the 15th century who is thought to have.",
    link: "/resume-builder-2",
    icon: book,
    bgColor1: "from-violet-800",
    bgColor2: "to-violet-400",
  },
  {
    title: "LinkedIn Profile Optimization",
    description:
      "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.)",
    link: "/",
    icon: profile,
    bgColor1: "from-cyan-400",
    bgColor2: "to-blue-600",
  },
  {
    title: "Personalized Email Generator",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/",
    icon: email,
    bgColor1: "from-pink-600",
    bgColor2: "to-orange-700",
  },
  {
    title: "Review Resume by AI",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/",
    icon: review,
    bgColor1: "from-cyan-600",
    bgColor2: "to-sky-300",
  },
  {
    title: "Consulting Bids Generator",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/resume-builder",
    icon: bigs,
    bgColor1: "from-red-600",
    bgColor2: "to-orange-400",
  },
  {
    title: "Letter Generator",
    description:
      "From its medieval origins to the digital era, learn everything",
    link: "/",
    icon: letter,
    bgColor1: "from-yellow-600",
    bgColor2: "to-yellow-400",
  },
];
// { name: "Career Coach", value: "careerCoach" },

const ResumeMaker = () => {
  const [activeTab, setActiveTab] = useState("Career Coach");
  return (
    <div className="px-5 gap-1 pt-2 mt-6">
      <div className="flex flex-wrap">
        {cardDetail.map((item, index) => (
          <ToolsCard key={index} {...item} isActive={activeTab === item.title} />
        ))}
      </div>
    </div>
  );
};

export default ResumeMaker;
