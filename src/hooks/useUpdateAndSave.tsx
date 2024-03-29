import {
  setBasicInfo,
  setCustomExperienceArray,
  setHeadings,
  setPrimarySkills,
  setSummary,
  setWorkExperienceArray,
} from "@/store/resumeSlice";
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
  const updateAndSaveCustomExperienceArray = (updatedCustomExp: any) => {
  console.log(updatedCustomExp);
    dispatch(
      setCustomExperienceArray(updatedCustomExp)
    );
    saveResumeToDB({
      ...resume,
      customExperienceArray: updatedCustomExp,
    });
  };
  
  const updateAndSaveCustomHeadings = (obj: any) => {
    const newCustomDetails = [...resume.customExperienceArray]
    newCustomDetails[obj.index]= obj.updatedDetail

    dispatch(
      setCustomExperienceArray(newCustomDetails)
    );
    saveResumeToDB({
      ...resume,
      customExperienceArray: newCustomDetails,
    });
    
  };

  //   update and save the Basic Info
  const updateAndSaveBasicInfo = (obj: any) => {
    const [[key, value]] = Object.entries(obj);

    dispatch(
      setBasicInfo({
        ...resume,
        contact: { ...resume.contact, [key]: value },
      })
    );
    saveResumeToDB({
      ...resume,
      contact: { ...resume.contact, [key]: value },
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

  const updateAndSaveJobTitle = (value: any) => {
    dispatch(setField({ name: "jobTitle", value: value }));
    saveResumeToDB({ ...resume, jobTitle: value });
  };
  const updateAndSaveHeadings = (obj: any) => {
    const [[key, value]] = Object.entries(obj);

    dispatch(
      setHeadings({
        ...resume,
        headings: { ...resume.headings, [key]: value },
      })
    );
    saveResumeToDB({
      ...resume,
      headings: { ...resume.headings, [key]: value },
    });
    
  };



  const updateAndSaveName = (value: any) => {
    dispatch(setField({ name: "name", value: value }));
    saveResumeToDB({ ...resume, name: value });
  };

  return {
    updateSaveHook: {
      updateAndSaveSkill,
      updateAndSaveJobTitle,
      updateAndSaveName,
      updateAndSaveSummary,
      updateAndSaveWorkExperienceArray,
      updateAndSaveBasicInfo,
      updateAndSaveEducation,
      updateAndSaveHeadings,
      updateAndSaveCustomHeadings,
      updateAndSaveCustomExperienceArray
    }
  };
};

export default useUpdateAndSave;
