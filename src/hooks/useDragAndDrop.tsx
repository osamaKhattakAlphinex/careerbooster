"use client";
import { setCustomExperienceArray, setPrimarySkills, setWorkExperienceArray } from "@/store/resumeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSaveResumeToDB from "./useSaveToDB";

const useDragAndDrop = () => {
  const dispatch = useDispatch();
  const { saveResumeToDB } = useSaveResumeToDB();
  const { resume } = useSelector((state: any) => state);

  const handleDropExperience = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume?.workExperienceArray];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    if (draggedIndex !== i) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };
  const handleDropCustomExperience = (e: any, i: number,customInd:number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];

    // Swap the positions of the dragged item and the target item.
    [newUpdatedCustomExpEntries[draggedIndex], newUpdatedCustomExpEntries[i]] = [
      newUpdatedCustomExpEntries[i],
      newUpdatedCustomExpEntries[draggedIndex],
    ];

    newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;

    if (draggedIndex !== i) {
      dispatch(
        setCustomExperienceArray(updatedCustomExp)
      );
      saveResumeToDB({
        ...resume,
        customExperienceArray: updatedCustomExp,
      });
    }
  };

  const handleDropAchievement = (
    i: number,
    ind: number,
    insideIndex: number
  ) => {
    let draggedIndex: number;
    let updatedItems = [];
    draggedIndex = insideIndex;
    updatedItems = [...resume?.workExperienceArray];
    let achievements = [...updatedItems[i].achievements];
    const temp = achievements[draggedIndex];
    achievements[draggedIndex] = achievements[ind];
    achievements[ind] = temp;
    let updatedWorkExperience = {
      ...updatedItems[i],
    };
    updatedWorkExperience.achievements = achievements;
    // Update the copy of the workExperience in the updatedItems array
    updatedItems[i] = updatedWorkExperience;
    if (draggedIndex !== ind) {
      dispatch(
        setWorkExperienceArray({
          ...resume,
          workExperienceArray: updatedItems,
        })
      );
      saveResumeToDB({
        ...resume,
        workExperienceArray: updatedItems,
      });
    }
  };
  const handleDropCustomAchievement = (
    i: number,
    ind: number,
    insideIndex: number,
    customInd:number,
  ) => {
    let draggedIndex: number;
    draggedIndex = insideIndex;
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
    let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[i] };
    let newUpdatedCustomAchievements: any = [...newUpdatedEntries.achievements];
    const temp = newUpdatedCustomAchievements[draggedIndex];
    newUpdatedCustomAchievements[draggedIndex] = newUpdatedCustomAchievements[ind];
    newUpdatedCustomAchievements[ind] = temp;
    newUpdatedEntries.achievements = newUpdatedCustomAchievements;
    newUpdatedCustomExpEntries[i] = newUpdatedEntries;
    newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;

    if (draggedIndex !== ind) {
      dispatch(
        setCustomExperienceArray(updatedCustomExp)
      );
      saveResumeToDB({
        ...resume,
        customExperienceArray: updatedCustomExp,
      });
    }
  };

  const handleDropPrimary = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...resume.primarySkills];
    // Swap the positions of the dragged item and the target item.
    [updatedItems[draggedIndex], updatedItems[i]] = [
      updatedItems[i],
      updatedItems[draggedIndex],
    ];
    dispatch(
      setPrimarySkills({
        ...resume,
        primarySkills: updatedItems,
      })
    );
    saveResumeToDB({
      ...resume,
      primarySkills: updatedItems,
    });
  };
  const handleDropSingleCustomSection = (e: any, i: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    let updatedCustomExp: any = [...resume.customExperienceArray];
    // Swap the positions of the dragged item and the target item.
    [updatedCustomExp[draggedIndex], updatedCustomExp[i]] = [
      updatedCustomExp[i],
      updatedCustomExp[draggedIndex],
    ];

    dispatch(
      setCustomExperienceArray(updatedCustomExp)
    );
    saveResumeToDB({
      ...resume,
      customExperienceArray: updatedCustomExp,
    });
   
  };

  return {
    handleDropAchievement,
    handleDropExperience,
    handleDropPrimary,
    handleDropCustomAchievement,
    handleDropCustomExperience,
    handleDropSingleCustomSection
  };
};

export default useDragAndDrop;
