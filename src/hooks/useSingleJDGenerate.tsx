"use client";
import React, { useEffect, useState } from "react";
import useGetUserData from "./useGetUserData";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomExperienceArray,
  setState,
  setWorkExperience,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import { WorkExperience, setUserData } from "@/store/userDataSlice";
import { fetchLIstOfStrings } from "@/helpers/fetchLIstOfStrings";
import useSaveResumeToDB from "./useSaveToDB";
import useGetCreditLimits from "./useGetCreditLimits";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";

const useSingleJDGenerate = (setStreamedJDData: any,setStreamedCustomData:any) => {
  const { getUserDataIfNotExists } = useGetUserData();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
  const resumeData = useSelector((state: any) => state.resume);
  const creditLimits = useSelector((state: any) => state.creditLimits);
  const { getCreditLimitsIfNotExists } = useGetCreditLimits();
  let oneWorkExpIndex: number;
  const { saveResumeToDB } = useSaveResumeToDB();

  const getOneWorkExperienceNew = async (experience: any) => {
    dispatch(setWorkExperience(""));
    let temp = "";

    let workExpArray = [...resumeData.workExperienceArray];
    if (experience && workExpArray.length) {
      oneWorkExpIndex = workExpArray.findIndex(
        (workExp: any) => JSON.stringify(workExp) === JSON.stringify(experience)
      );
    }

    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    const { quantifyingExperience } = resumeData;
    if (userData.isFetched) {
      let workExpArrObj: any = {};

      workExpArrObj.title = experience?.title;

      workExpArrObj.cityState = experience?.cityState;
      workExpArrObj.country = experience?.country;
      workExpArrObj.company = experience?.company;
      workExpArrObj.fromMonth = experience?.fromMonth;
      workExpArrObj.fromYear = experience?.fromYear;
      workExpArrObj.isContinue = experience?.isContinue;
      workExpArrObj.toMonth = experience?.toMonth;
      workExpArrObj.toYear = experience?.toYear;

      let achievementTemp = "";
      const res: any = await fetch("/api/resumeBots/jdGeneratorSingle", {
        method: "POST",
        body: JSON.stringify({
          quantifyingExperience: quantifyingExperience,
          experience: experience,

          creditsUsed: creditLimits.resume_individualWorkExperience,
          trainBotData: {
            userEmail: userData.email,
            // fileAddress: userData.files[0].fileName,
            fileAddress: userData.uploadedResume.fileName,
          },
          personName: userData.firstName + " " + userData.lastName,
          jobTitle: resumeData.state.jobPosition,
        }),
      });

      if (res.ok) {
        const reader = res.body.getReader();
        setStreamedJDData(" ");

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);
          // const text = response.result;

          setStreamedJDData((prev: any) => prev + text);
          // temp += text;
          achievementTemp += text;
        }
      } else {
        setStreamedJDData("");
        showErrorToast("You ran out of credits!");
        dispatch(setWorkExperienceArray({ workExperienceArray: workExpArray }));
        dispatch(setState({ name: "resumeLoading", value: false }));
      }

      if (achievementTemp.length > 0) {
        setStreamedJDData((prev: any) => prev + `</div> <br /> `);
        temp += `</div> <br /> `;
        const achivementsArray = fetchLIstOfStrings(achievementTemp);
        workExpArrObj.achievements = achivementsArray;

        workExpArray.splice(oneWorkExpIndex, 1, workExpArrObj);
        saveResumeToDB({
          ...resumeData,
          workExperienceArray: workExpArray,
        });
        dispatch(setWorkExperienceArray({ workExperienceArray: workExpArray }));
        dispatch(setState({ name: "resumeLoading", value: false }));
        showSuccessToast("Generated Successfully");
        // dispatch(setWorkExperience(temp));
        setStreamedJDData("");
      }
    }
  };
  const getOneCustomWorkExperienceNew = async (customSection: any, customInd:number) => {

    let updatedCustomExp: any = [...resumeData.customExperienceArray];
    let newUpdatedCustomExp: any ={...updatedCustomExp[customInd]}
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];

    if (customSection && newUpdatedCustomExpEntries.length) {
      oneWorkExpIndex = newUpdatedCustomExpEntries.findIndex(
        (workExp: any) => JSON.stringify(workExp) === JSON.stringify(customSection)
      );
    }

    await getUserDataIfNotExists();
    await getCreditLimitsIfNotExists();
    if (userData.isFetched) {
      let workExpArrObj: any = {};

      workExpArrObj.title = customSection?.title;

      workExpArrObj.cityState = customSection?.cityState;
      workExpArrObj.country = customSection?.country;
      workExpArrObj.fromMonth = customSection?.fromMonth;
      workExpArrObj.fromYear = customSection?.fromYear;
      workExpArrObj.isContinue = customSection?.isContinue;
      workExpArrObj.toMonth = customSection?.toMonth;
      workExpArrObj.toYear = customSection?.toYear;

      let achievementTemp = "";
      const res: any = await fetch("/api/resumeBots/getCustomSingleDetails", {
        method: "POST",
        body: JSON.stringify({
          personName: userData.firstName + " " + userData.lastName,
          creditsUsed: creditLimits.resume_basicInfo,
          jobPosition: resumeData.state.jobPosition,
          data: customSection,
        }),
      });

      if (res.ok) {
        const reader = res.body.getReader();
        setStreamedCustomData(" ");

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const text = new TextDecoder().decode(value);

          setStreamedCustomData((prev: any) => prev + text);
          achievementTemp += text;
        }
      } else {
        setStreamedCustomData("");
        showErrorToast("You ran out of credits!");
        dispatch(setCustomExperienceArray(updatedCustomExp));
        dispatch(setState({ name: "resumeLoading", value: false }));
      }

      if (achievementTemp.length > 0) {
        setStreamedCustomData((prev: any) => prev + `</div> <br /> `);
        const achivementsArray = fetchLIstOfStrings(achievementTemp);
        workExpArrObj.achievements = achivementsArray;

        newUpdatedCustomExpEntries.splice(oneWorkExpIndex, 1, workExpArrObj);
        newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
        updatedCustomExp[customInd]= newUpdatedCustomExp
        saveResumeToDB({
          ...resumeData,
          customExperienceArray: updatedCustomExp,
        });
        dispatch(setCustomExperienceArray(updatedCustomExp));
        dispatch(setState({ name: "resumeLoading", value: false }));
        showSuccessToast("Generated Successfully");
        setStreamedCustomData("");
      }
    }
  };

  return { getOneWorkExperienceNew ,getOneCustomWorkExperienceNew};
};

export default useSingleJDGenerate;
