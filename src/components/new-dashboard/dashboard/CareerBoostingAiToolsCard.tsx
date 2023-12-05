"use client";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import RecentResumeCard from "./resume-builder/RecentResumeCard";
import PreviouslyGeneratedList from "@/components/PreviouslyGeneratedList";
import CoverLetterCardSingle from "./cover-letter-generator/CoverLetterCardSingle";
import ConsultingBidCardSingle from "./consulting-bids-generator/ConsultingBidCardSingle";
import EmailCardSingle from "@/components/new-dashboard/dashboard/email-generator/EmailCardSingle";

const tabOptions = [
  { name: "Resumes", value: "resumemaker" },
  { name: "Cover Letter", value: "cover-letter" },
  { name: "Consulting Bids", value: "consulting-bids" },
  { name: "Email Bot", value: "email-bot" },
];

const CareerBoostingAiToolsCard = () => {
  const componentRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState("resumemaker");
  const historyProps = {
    dataSource: "coverLetters",
    Component: (card: any) => (
      <CoverLetterCardSingle card={card} source="dashboard" />
    ),
  };
  const historyProp = {
    dataSource: "consultingBids",
    Component: (card: any) => (
      <ConsultingBidCardSingle
        card={card}
        source="dashboard"
        componentRef={componentRef}
      />
    ),
  };
  const historyProps1 = {
    dataSource: "emails",
    Component: (card: any) => (
      <EmailCardSingle
        card={card}
        source="dashboard"
        componentRef={componentRef}
      />
    ),
  };
  return (
    <div className="mt-6 mb-[20px]">
      <h1 className="pb-2 rounded-[14px] text-zinc-500 font-bold uppercase text-[14px] ">
        Recent ai generated documents
      </h1>
      <div className="flex mt-3">
        {tabOptions.map((option, index) => (
          <Button
            key={index}
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
      {activeTab === "consulting-bids" && (
        <div className="my-5">
          <PreviouslyGeneratedList {...historyProp} />
        </div>
      )}
      {activeTab === "email-bot" && (
        <div className="my-5">
          <PreviouslyGeneratedList {...historyProps1} />
        </div>
      )}
    </div>
  );
};

export default CareerBoostingAiToolsCard;
