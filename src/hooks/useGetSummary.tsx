"use client";

import { setSummary } from "@/store/resumeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";
import { usePathname } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { useAppContext } from "@/context/AppContext";

const useGetSummary = (
  setStreamedSummaryData: any,
) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const resumeData = useSelector((state: any) => state.resume);
  const { saveResumeToDB } = useSaveResumeToDB();
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const path = usePathname();
  const {abortController, setOutOfCredits} = useAppContext()
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
    // dispatch(setLoadingState("summary"));
    setStreamedSummaryData("");
    dispatch(setSummary(""));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        personName: userData?.firstName + " " + userData?.lastName,

        resumeType: resumeData.state.resumeType,
        jobPosition: resumeData.state.jobPosition,
        jobDescription: resumeData.state.jobDescription,

        creditsUsed: creditLimits.resume_summary_generation,
        userData: aiInputUserData,
        trainBotData: {
          userEmail: userData.email,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
      signal: abortController?.signal
    })
      .then(async (resp: any) => {
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
            showSuccessToast("Generated Successfully");
            saveResumeToDB({
              ...resumeData,
              summary: summaryTemp,
            });
          }
        } else {
          setStreamedSummaryData(resumeData?.summary);
          dispatch(setSummary(resumeData?.summary));
          if (resp.status === 429) {
            showErrorToast("You ran out of credits!");
            if (setOutOfCredits !== "") {
              setOutOfCredits(true);
            }
          }
        }
      })
      .catch((err) => {
        setStreamedSummaryData(resumeData?.summary);
        dispatch(setSummary(resumeData?.summary));
      });
  };

  return { getSummary };
};

export default useGetSummary;
