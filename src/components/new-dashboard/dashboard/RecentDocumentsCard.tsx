"use client";
import Button from "@/components/Button";
import { useState } from "react";
import ResumesListCard from "@/components/new-dashboard/dashboard/ResumesListCard";
import Alert from "../common/Alert";
import ResumeMaker from "./ResumeMaker";
import ProfileCompletionAlert from "@/components/dashboard/ProfileCompletionAlert";

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
      {/* <Alert show={show} onClose={() => setShow(false)} /> */}
      <ProfileCompletionAlert />
      <div className="mt-5">
        <h1 className="pb-2 rounded-[14px] text-zinc-500 font-bold uppercase text-[14px] lg:pl-0 pl-5 lg:mt-0 ">
          career booster ai tools
        </h1>
        <div className="flex mt-5">
          <ResumeMaker />
        </div>
      </div>
    </>
  );
};

export default RecentDocumentsCard;
