"use client";
import Button from "@/components/Button";
import { useState } from "react";
import RecentResumeCard from "./resume-builder/RecentResumeCard";

const tabOptions = [
  { name: "Resumes", value: "resumemaker" },
  { name: "Cover Letter", value: "career" },
  { name: "Consulting Bids", value: "proposals" },
  { name: "LinkedIn", value: "linkedin" },
];

const CareerBoostingAiToolsCard = () => {
  const [activeTab, setActiveTab] = useState("resumemaker");
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
      {activeTab === "career" && (
        <h1 className="text-gray-100">
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
          CareerBidsConsulting BidsConsulting BidsConsulting
        </h1>
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
