"use client";
import Button from "@/components/new-dashboard/Button";
import { useState } from "react";
import ResumesListCard from "@/components/new-dashboard/dashboard/ResumesListCard";
import Alert from "../common/Alert";
import ResumeMaker from "./ResumeMaker";

const tabOptions = [
  { name: "Career", value: "career" },
  { name: "Resume Maker", value: "resumeMaker" },
  { name: "Proposals", value: "proposals" },
  { name: "LinkedIn", value: "linkedin" },
];

const RecentDocumentsCard = () => {
  const [activeTab, setActiveTab] = useState("resumeMaker");
  const [show, setShow] = useState(true);
  return (
    <>
     <Alert show={show} onClose={() => setShow(false)} />
      
      <h1 className="pb-2 rounded-[14px] text-zinc-500 font-bold uppercase text-[14px] ">
      career boosting ai tools
      </h1>
      <div className="flex mt-5">
        {tabOptions.map((option) => (
          <Button
            btnText={option.name}
            isActive={activeTab === option.value}
            onClick={() => setActiveTab(option.value)}
            
          />
        ))}
      </div>
      {activeTab === "career" && <ResumesListCard />}
      {activeTab === "resumeMaker" && <ResumeMaker/> }
      {activeTab === "proposals" && (
        <h1 className="text-gray-100">Consulting Bids</h1>
      )}
      {activeTab === "linkedin" && <h1 className="text-gray-100">LinedIn</h1>}
    
      </>
  );
};

export default RecentDocumentsCard;
