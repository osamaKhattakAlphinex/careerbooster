"use client";
import { setPrimarySkills, setWorkExperienceArray } from "@/store/resumeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";

const useAddPrimarySkill = () => {
  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();
  const { resume } = useSelector((state: any) => state);

  const addPrimarySkill = (primarySkill: string) => {
    const primarySkills = resume?.primarySkills;
    const updatedSkills = [...primarySkills];
    updatedSkills.push(primarySkill);
    dispatch(setPrimarySkills({ primarySkills: updatedSkills }));
    saveResumeToDB({
      ...resume,
      primarySkills: updatedSkills,
    });
  };

  return {
    addPrimarySkill,
  };
};

export default useAddPrimarySkill;
