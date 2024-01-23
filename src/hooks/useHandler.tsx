import React from "react";
import useUpdateAndSave from "./useUpdateAndSave";
import { useSelector } from "react-redux";

const useHandler = () => {
  const resume = useSelector((state: any) => state.resume);

  const { updateAndSaveWorkExperienceArray, updateAndSaveEducation } =
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
    updateAndSaveWorkExperienceArray(updatedExp);
    // setNewAchievement("");
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
      updateAndSaveWorkExperienceArray(updatedExp);
      //   setNewAchievement("");
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
    updateAndSaveWorkExperienceArray(updatedExp);
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
      updateAndSaveWorkExperienceArray(updatedExp);
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
    updateAndSaveWorkExperienceArray(updatedExp);
  };

  const handleSaveExperienceDetail = (obj: {}, expInd: number) => {
    const [[key, value]] = Object.entries(obj);
    if (value !== resume?.workExperienceArray[expInd][key]) {
      let updatedExp = [...resume.workExperienceArray];
      updatedExp[expInd] = {
        ...updatedExp[expInd],
        [key]: value,
      };
      updateAndSaveWorkExperienceArray(updatedExp);
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
      updateAndSaveEducation(updatedEducations);
    }
  };

  return {
    handleAddAchivement,
    handleAddSpace,
    handleRemoveExtraSpace,
    handleUpdateAchivement,
    handleSaveEductionDetail,
    handleDeleteAchivement,
    handleSaveExperienceDetail,
  };
};

export default useHandler;
