import React from "react";
import useUpdateAndSave from "./useUpdateAndSave";
import { useSelector } from "react-redux";

const useHandler = () => {
  const resume = useSelector((state: any) => state.resume);

  const { updateSaveHook } = useUpdateAndSave();

  // add the space
  const handleAddSpace = (i: number, newAchievement: string) => {
    let updatedExp: any = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[i].achievements];
    updatedAchievements.push(newAchievement);
    updatedExp[i] = {
      ...updatedExp[i],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleAddCustomSpace = (
    i: number,
    newAchievement: string,
    customInd: number
  ) => {
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
    let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[i] };
    let newUpdatedCustomAchievements: any = [...newUpdatedEntries.achievements];
    newUpdatedCustomAchievements.push(newAchievement);
    newUpdatedEntries.achievements = newUpdatedCustomAchievements;
    newUpdatedCustomExpEntries[i] = newUpdatedEntries;
    newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;
    updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
  };

  // handle Add achivements
  const handleAddAchivement = (i: number, newAchievement: string) => {
    if (newAchievement !== "") {
      let updatedExp: any = [...resume.workExperienceArray];
      let updatedAchievements = [...updatedExp[i].achievements];
      updatedAchievements.push(newAchievement);
      updatedExp[i] = {
        ...updatedExp[i],
        achievements: updatedAchievements,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };
  const handleAddCustomAchivement = (
    i: number,
    newAchievement: string,
    customInd: number
  ) => {
    console.log(i, newAchievement, customInd);
    if (newAchievement !== "") {
      let updatedCustomExp: any = [...resume.customExperienceArray];
      let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
      let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
      let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[i] };
      let newUpdatedCustomAchievements: any = [
        ...newUpdatedEntries.achievements,
      ];
      newUpdatedCustomAchievements.push(newAchievement);
      newUpdatedEntries.achievements = newUpdatedCustomAchievements;
      newUpdatedCustomExpEntries[i] = newUpdatedEntries;
      newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
      updatedCustomExp[customInd] = newUpdatedCustomExp;
      updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
    }
  };

  const handleDeleteAchivement = (expInd: number, achiveInd: number) => {
    let updatedExp: any = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[expInd].achievements];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleDeleteAchivementCustom = (
    expInd: number,
    achiveInd: number,
    customInd: number
  ) => {
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
    let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[expInd] };
    let newUpdatedCustomAchievements: any = [...newUpdatedEntries.achievements];
    newUpdatedCustomAchievements.splice(achiveInd, 1);
    newUpdatedEntries.achievements = newUpdatedCustomAchievements;
    newUpdatedCustomExpEntries[expInd] = newUpdatedEntries;
    newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;
    updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
  };

  const handleDeleteExperience = (expInd: number) => {
    let updatedExp: any = [...resume.workExperienceArray];
    updatedExp.splice(expInd, 1);
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };

  const handleDeleteCustomExperience = (expInd: number, customInd: number) => {
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let entries = [...newUpdatedCustomExp.entries];
    entries.splice(expInd, 1);
    newUpdatedCustomExp.entries = entries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;
    updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
  };

  const handleUpdateAchivement = (
    expInd: number,
    achiveInd: number,
    value: string
  ) => {
    if (
      value !== resume?.workExperienceArray[expInd]?.achievements[achiveInd]
    ) {
      let updatedExp: any = [...resume.workExperienceArray];
      let updatedAchievements = [...updatedExp[expInd].achievements];
      updatedAchievements.splice(achiveInd, 1, value);
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        achievements: updatedAchievements,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };
  const handleUpdateAchivementCustom = (
    expInd: number,
    achiveInd: number,
    value: string,
    customInd: number
  ) => {
    if (
      value !==
      resume?.customExperienceArray[customInd]?.entries[expInd]?.achievements[
        achiveInd
      ]
    ) {
      let updatedCustomExp: any = [...resume.customExperienceArray];
      let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
      let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
      let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[expInd] };
      let newUpdatedCustomAchievements: any = [
        ...newUpdatedEntries.achievements,
      ];
      newUpdatedCustomAchievements.splice(achiveInd, 1, value);
      newUpdatedEntries.achievements = newUpdatedCustomAchievements;
      newUpdatedCustomExpEntries[expInd] = newUpdatedEntries;
      newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
      updatedCustomExp[customInd] = newUpdatedCustomExp;
      updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
    }
  };

  const handleRemoveExtraSpace = (expInd: number, achiveInd: number) => {
    let updatedExp: any = [...resume.workExperienceArray];
    let updatedAchievements = [...updatedExp[expInd].achievements];
    updatedAchievements.splice(achiveInd, 1);
    updatedExp[expInd] = {
      ...updatedExp[expInd],
      achievements: updatedAchievements,
    };
    updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
  };
  const handleRemoveExtraSpaceCustom = (
    expInd: number,
    achiveInd: number,
    customInd: number
  ) => {
    let updatedCustomExp: any = [...resume.customExperienceArray];
    let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
    let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
    let newUpdatedEntries: any = { ...newUpdatedCustomExp.entries[expInd] };
    let newUpdatedCustomAchievements: any = [...newUpdatedEntries.achievements];
    newUpdatedCustomAchievements.splice(achiveInd, 1);
    newUpdatedEntries.achievements = newUpdatedCustomAchievements;
    newUpdatedCustomExpEntries[expInd] = newUpdatedEntries;
    newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
    updatedCustomExp[customInd] = newUpdatedCustomExp;
    updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
  };

  const handleSaveExperienceDetail = (obj: {}, expInd: number) => {
    const [[key, value]] = Object.entries(obj);
    if (value !== resume?.workExperienceArray[expInd][key]) {
      let updatedExp = [...resume.workExperienceArray];
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        [key]: value,
      };
      updateSaveHook.updateAndSaveWorkExperienceArray(updatedExp);
    }
  };

  const handleSaveExperienceCustomDetail = (
    obj: {},
    expInd: number,
    customInd: number
  ) => {
    const [[key, value]] = Object.entries(obj);
    if (
      value !== resume?.customExperienceArray[customInd].entries[expInd][key]
    ) {
      let updatedCustomExp: any = [...resume.customExperienceArray];
      let newUpdatedCustomExp: any = { ...updatedCustomExp[customInd] };
      let newUpdatedCustomExpEntries: any = [...newUpdatedCustomExp.entries];
      newUpdatedCustomExpEntries[expInd] = {
        ...newUpdatedCustomExpEntries[expInd],
        [key]: value,
      };
      newUpdatedCustomExp.entries = newUpdatedCustomExpEntries;
      updatedCustomExp[customInd] = newUpdatedCustomExp;
      updateSaveHook.updateAndSaveCustomExperienceArray(updatedCustomExp);
    }
  };

  const handleSaveEductionDetail = (obj: {}, ind: number) => {
    const [[key, value]] = Object.entries(obj);
    if (value !== resume?.education[ind][key]) {
      let updatedEducations = [...resume.education];
      updatedEducations[ind] = {
        ...updatedEducations[ind],
        [key]: value,
      };
      updateSaveHook.updateAndSaveEducation(updatedEducations);
    }
  };

  const handleDeleteEductionDetail = (ind: number) => {
    let updatedEducations = [...resume?.education];
    updatedEducations.splice(ind, 1);
    updateSaveHook.updateAndSaveEducation(updatedEducations);
  };

  const handleDeleteSkill = (i: number) => {
    const removeSkill = [...resume.primarySkills];
    removeSkill.splice(i, 1);
    updateSaveHook.updateAndSaveSkill(removeSkill);
  };

  const handleUpdateSkill = (value: string, i: number) => {
    if (value !== resume?.primarySkills[i]) {
      let updatedSkills = [...resume.primarySkills];
      updatedSkills.splice(i, 1, value);
      updateSaveHook.updateAndSaveSkill(updatedSkills);
    }
  };
  return {
    handlers: {
      handleDeleteSkill,
      handleUpdateSkill,
      handleAddAchivement,
      handleAddSpace,
      handleRemoveExtraSpace,
      handleUpdateAchivement,
      handleDeleteAchivement,
      handleSaveExperienceDetail,
      handleSaveEductionDetail,
      handleDeleteEductionDetail,
      handleDeleteExperience,
      handleDeleteCustomExperience,
      handleAddCustomSpace,
      handleAddCustomAchivement,
      handleRemoveExtraSpaceCustom,
      handleSaveExperienceCustomDetail,
      handleDeleteAchivementCustom,
      handleUpdateAchivementCustom,
    },
  };
};

export default useHandler;
