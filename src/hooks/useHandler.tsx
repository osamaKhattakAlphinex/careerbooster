import React from "react";
import useUpdateAndSave from "./useUpdateAndSave";
import { useSelector } from "react-redux";

const useHandler = () => {
  const resume = useSelector((state: any) => state.resume);

  const { updateSaveHook } =
    useUpdateAndSave();

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
  }

  const handleDeleteSkill = (i: number) => {
    const removeSkill = [...resume.primarySkills];
    removeSkill.splice(i, 1);
    updateSaveHook.updateAndSaveSkill(removeSkill);
  }

  const handleUpdateSkill = (value: string, i: number) => {
    if (value !== resume?.primarySkills[i]) {
      let updatedSkills = [...resume.primarySkills];
      updatedSkills.splice(i, 1, value);
      updateSaveHook.updateAndSaveSkill(updatedSkills);
    }
  }
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
      handleDeleteEductionDetail
    }
  };
};

export default useHandler;
