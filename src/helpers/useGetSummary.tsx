"use client";

import { setSummary } from "@/store/resumeSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSummary = () => {
  const dispatch = useDispatch();
  const [streamedSummaryData, setStreamedSummaryData] = useState("");
  const userData = useSelector((state: any) => state.userData);
  const resumeData = useSelector((state: any) => state.resume);
  const [aiInputUserData, setAiInputUserData] = useState<any>();

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

  // useEffect(() => {
  //   getSummary();
  // }, []);

  const getSummary = async () => {
    // return makeAPICallWithRetry(async () => {
    // await getUserDataIfNotExists();
    setStreamedSummaryData("");
    dispatch(setSummary(""));
    // dispatch(setLoadingState("summary"));
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "summary",
        personName: userData?.firstName + " " + userData?.lastName,
        jobPosition: resumeData.state.jobPosition,
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
          setStreamedSummaryData((prev) => prev + text);
          summaryTemp += text;
        }

        dispatch(setSummary(summaryTemp));
      } else {
        setStreamedSummaryData("Error! Something went wrong");
      }
    });
    // });
  };

  return { setStreamedSummaryData, streamedSummaryData, getSummary };
};

export default useGetSummary;
