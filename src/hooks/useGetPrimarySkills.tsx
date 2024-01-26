"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetUserData from "./useGetUserData";
import { setPrimarySkills } from "@/store/resumeSlice";
import useSaveResumeToDB from "./useSaveToDB";
import useGetCreditLimits from "./useGetCreditLimits";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";

const useGetPrimarySkills = (setRegenerating: any) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const resumeData = useSelector((state: any) => state.resume);
  const { getUserDataIfNotExists } = useGetUserData();
  const [aiInputUserData, setAiInputUserData] = useState<any>();
  const { saveResumeToDB } = useSaveResumeToDB();

  const creditLimits = useSelector((state: any) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
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

  const getPrimarySkills = async () => {
    setRegenerating(true);
    // return makeAPICallWithRetry(async () => {
    // dispatch(setLoadingState("primarySkills"));
    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    return fetch("/api/resumeBots/getBasicInfo", {
      method: "POST",
      body: JSON.stringify({
        type: "primarySkills",
        personName: userData?.firstName + " " + userData?.lastName,
        userData: aiInputUserData,
        jobPosition: resumeData.state.jobPosition,

        creditsUsed: creditLimits.resume_skills,

        trainBotData: {
          userEmail: userData.email,
          // fileAddress: userData.files[0].fileName,
          fileAddress: userData.uploadedResume.fileName,
        },
      }),
    }).then(async (resp: any) => {
      const res = await resp.json();
      if (res.success) {
        if (res?.result) {
          let myJSON = JSON.parse(JSON.stringify(res.result));

          myJSON = JSON.parse(myJSON);
          dispatch(setPrimarySkills({ primarySkills: myJSON }));
          setRegenerating(false);
          saveResumeToDB({
            ...resumeData,
            primarySkills: myJSON,
          });
        }
        showSuccessToast("Generated Successfully");
      } else {
        showErrorToast("You ran out of credits!");
        setRegenerating(false);
      }
    });
  };

  return { getPrimarySkills };
};

export default useGetPrimarySkills;
