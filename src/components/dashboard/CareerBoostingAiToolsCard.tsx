"use client";
import { useRef, useState } from "react";
import RecentResumeCard from "./resume-builder/RecentResumeCard";
import PreviouslyGeneratedList from "@/components/dashboard/PreviouslyGeneratedList";
import CoverLetterCardSingle from "./cover-letter-generator/CoverLetterCardSingle";
import ConsultingBidCardSingle from "./consulting-bids-generator/ConsultingBidCardSingle";
import EmailCardSingle from "@/components/dashboard/email-generator/EmailCardSingle";
import Button from "./Button";

const tabOptions = [
  { name: "Resumes", value: "resumemaker" },
  { name: "Cover Letter", value: "cover-letter" },
  { name: "Email Bot", value: "email-bot" },
  { name: "Consulting Bids", value: "consulting-bids" },
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
        Recent ai generated documents1111
      </h1>
      <div className="flex mt-3 flex-wrap gap-2">
        {tabOptions.map((option, index) => (
          <Button
            className={`hover:border-fuchsia-600 xs:px-[20px] xs:py-[6px] xs:text-[10px] xs:mr-[3px]`}
            key={`tab-${index}`}
            btnText={option.name}
            isActive={activeTab === option.value}
            onClick={() => setActiveTab(option.value)}
          />
        ))}
      </div>
      {activeTab === "resumemaker" && (
        <div className="my-5">
          <RecentResumeCard source="dashboard" />
        </div>
      )}
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
