"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CreditsPerUsageModal from "@/components/admin/creditsPerUsageModal";
import { useAppContext } from "@/context/AppContext";

const nameFormatter = (key: string) => {
  return key.replaceAll("_", " ");
};

export type CreditPerUsage = {
  resume_summary_generation: Number;
  resume_basicInfo: Number;
  resume_skills: Number;
  resume_individualWorkExperience: Number;
  linkedin_keywords_generation: Number;
  linkedin_headline_generation: Number;
  linkedin_about_generation: Number;
  linkedin_individualWorkExperience: Number;
  cover_letter_generation: Number;
  email_generation: Number;
  pdf_files_upload: Number;
  review_resume: Number;
  consulting_bids_generation: Number;
  save_resume: Number;
  download_resume: Number;
};

const CreditPerUsagePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<CreditPerUsage | null>(null);
  const creditModalRef: React.MutableRefObject<any> = useRef(null);

  const handleUpdate = () => {
    if (creditModalRef.current) {
      creditModalRef.current.openModal(true, credits);
    }
  };

  const getCredits = async () => {
    setLoading(true);

    if (!loading) {
      try {
        let response: any = await axios.get("/api/users/CreditLimits");
        if (response?.data.success) {
          setCredits(response.data.result);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getCredits();
  }, []);

  return (
    <>
      <CreditsPerUsageModal ref={creditModalRef} refresh={getCredits} />

      <div className="flex flex-col items-start justify-start">
        <h2 className="text-xl uppercase dark:text-white/70 text-black/70">
          Credits per usage
        </h2>
        <span className="text-base dark:text-white/70 text-black/70">
          Credits
        </span>

        <button
          onClick={handleUpdate}
          className="self-end px-3 py-2 text-xs font-medium text-center text-white no-underline bg-green-700 rounded-lg whitespace-nowrap hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Update
        </button>

        <div className="grid w-full grid-cols-2 gap-4 mt-4 overflow-x-auto">
          {credits &&
            Object.entries(credits).map(([key, value]: any, index) =>
              index === 0 ? (
                ""
              ) : (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-sm border-[1px] dark:border-gray-600"
                >
                  <span className="font-semibold capitalize ">
                    {nameFormatter(key)}
                  </span>
                  <span>{value}</span>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default CreditPerUsagePage;
