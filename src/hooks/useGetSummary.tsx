"use client";

import { setSummary } from "@/store/resumeSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetUserData from "./useGetUserData";
import useSaveResumeToDB from "./useSaveToDB";
import useGetCreditLimits from "./useGetCreditLimits";
import { usePathname } from "next/navigation";

const useGetSummary = (setStreamedSummaryData: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const resumeData = useSelector((state: any) => state.resume);
  const { getUserDataIfNotExists } = useGetUserData();
  const { saveResumeToDB } = useSaveResumeToDB();
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const path = usePathname();

  useEffect(() => {
    if (userData && userData?.email) {
      setAiInputUserData({
        contact: userData?.contact,
        education: userData?.education,
        email: userData?.email,
        experience: userData?.experience,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        phone: userData?.phone,
        skills: userData?.skills,
      });
    }
  }, []);

  const getSummary = async () => {
    // return aiInputUserData
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    setStreamedSummaryData("");
    dispatch(setSummary(""));
    // dispatch(setLoadingState("summary"));

    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        personName: userData?.firstName + " " + userData?.lastName,
        jobPosition: resumeData.state.jobPosition,

        creditsUsed: creditLimits.resume_summary_generation,
        userData: aiInputUserData,
        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
    }).then(async (resp: any) => {
      // const res = await resp.json();

      if (resp.ok) {
        const reader = resp.body.getReader();
        let summaryTemp = "";
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          setStreamedSummaryData((prev: any) => prev + text);
          summaryTemp += text;
        }

        dispatch(setSummary(summaryTemp));
        if (path !== "/resume-builder") {
          saveResumeToDB({
            ...resumeData,
            summary: summaryTemp,
          });
        }
      } else {
        setStreamedSummaryData(resumeData?.summary);
      }
    });
    // });
  };

  return { getSummary };
};

export default useGetSummary;
