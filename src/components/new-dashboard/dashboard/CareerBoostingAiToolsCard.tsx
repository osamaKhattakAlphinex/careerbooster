"use client";
import Button from "@/components/Button";
import { useState } from "react";
import RecentResumeCard from "./resume-builder/RecentResumeCard";
import AiGeneratedCoverLetters from "./cover-letter-generator/AiGeneratedCoverLetters";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import CoverLetterCardSingle from "./cover-letter-generator/CoverLetterCardSingle";

const tabOptions = [
  { name: "Resumes", value: "resumemaker" },
  { name: "Cover Letter", value: "cover-letter" },
  { name: "Consulting Bids", value: "proposals" },
  { name: "LinkedIn", value: "linkedin" },
];

const CareerBoostingAiToolsCard = () => {
  const [activeTab, setActiveTab] = useState("resumemaker");
  const historyProps = {
    dataSource: "coverLetters",
    Component: (card: any) => (
      <CoverLetterCardSingle card={card} source="dashboard" />
    ),
  };
  return (
    <div className="mt-6 mb-[20px]">
      <h1 className="pb-2 rounded-[14px] text-zinc-500 font-bold uppercase text-[14px] ">
        Recent ai generated documents
      </h1>
      <div className="flex mt-3">
        {tabOptions.map((option) => (
          <Button
            btnText={option.name}
            isActive={activeTab === option.value}
            onClick={() => setActiveTab(option.value)}
          />
        ))}
      </div>
      {activeTab === "resumemaker" && <RecentResumeCard source="dashboard" />}
      {activeTab === "cover-letter" && (
        <div className="my-5">
          <PreviouslyGeneratedList {...historyProps} />
        </div>
      )}
      {activeTab === "proposals" && (
        <h1 className="text-gray-100">
          Consulting BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting
          BidsConsulting BidsConsulting BidsConsulting BidsConsulting Bids
        </h1>
      )}
      {activeTab === "linkedin" && <h1 className="text-gray-100">1</h1>}
    </div>
  );
};

export default CareerBoostingAiToolsCard;
