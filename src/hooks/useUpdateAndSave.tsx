import {
  setBasicInfo,
  setPrimarySkills,
  setSummary,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";
import { setField } from "@/store/userDataSlice";

const useUpdateAndSave = () => {
  const resume = useSelector((state: any) => state.resume);
  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();

  //   update and save the Skills
  const updateAndSaveSkill = (updatedSkills: any) => {
    dispatch(
      setPrimarySkills({
        ...resume,
        primarySkills: updatedSkills,
      })
    );
    saveResumeToDB({
      ...resume,
      primarySkills: updatedSkills,
    });
  };

  //   update and save the Summary
  const updateAndSaveSummary = (value: any) => {
    dispatch(setSummary(value));
    saveResumeToDB({ ...resume, summary: value });
  };

  //   update and save the Save Work Experience Array
  const updateAndSaveWorkExperienceArray = (updatedExp: any) => {
    dispatch(
      setWorkExperienceArray({
        workExperienceArray: updatedExp,
      })
    );
    saveResumeToDB({
      ...resume,
      workExperienceArray: updatedExp,
    });
  };

  //   update and save the Basic Info
  const updateAndSaveBasicInfo = (value: any) => {
    dispatch(
      setBasicInfo({
        ...resume,
        contact: { ...resume.contact, phone: value },
      })
    );
    saveResumeToDB({
      ...resume,
      contact: { ...resume.contact, phone: value },
    });
  };

  //   update and save the Education
  const updateAndSaveEducation = (updatedEducations: any) => {
    dispatch(
      setField({
        name: "education",
        value: updatedEducations,
      })
    );
    saveResumeToDB({
      ...resume,
      education: updatedEducations,
    });
  };

  return {
    updateAndSaveSkill,
    updateAndSaveSummary,
    updateAndSaveWorkExperienceArray,
    updateAndSaveBasicInfo,
    updateAndSaveEducation,
  };
};

export default useUpdateAndSave;
