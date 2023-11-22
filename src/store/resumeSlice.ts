// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Resume {
  state: {
    jobPosition: string;
    resumeLoading: boolean;
    componentRef: any;
  };
  dateTime?: string;
  id?: string;
  uploadedFileName: string;
  // loadingState: string;
  shortName: string;
  name: string;
  jobTitle: string;
  contact: {
    email: string;
    phone: string;
    linkedIn: string;
  };
  education: [
    {
      school: string;
      degree: string;
      year: string;
    }
  ];
  summary: string;
  workExperienceArray: WorkExperience[];
  workExperience: "";
  primarySkills: [];
  professionalSkills: [];
  secondarySkills: [];
}

const initialState: Resume = {
  state: {
    jobPosition: "",
    resumeLoading: false,
    componentRef: null,
  },
  dateTime: "",
  id: "",
  uploadedFileName: "",
  // loadingState: "",
  shortName: "",
  name: "",
  jobTitle: "",
  contact: {
    email: "",
    phone: "",
    linkedIn: "",
  },
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
  summary: "",
  workExperienceArray: [],
  workExperience: "",
  primarySkills: [],
  professionalSkills: [],
  secondarySkills: [],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    emptyResume() {
      return {
        ...initialState,
      };
    },

    resetResume(state, action) {
      return {
        ...initialState,
        state: action.payload,
      };
    },
    setResume(state, action) {
      return {
        ...action.payload,
      };
    },
    setField(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },

    setState(state, action) {
      return {
        ...state,
        state: {
          ...state.state,
          [action.payload.name]: action.payload.value,
        },
      };
    },

    setId(state, action) {
      return {
        ...state,
        id: action.payload,
      };
    },

    setUploadedFileName(state, action) {
      return {
        ...state,
        uploadedFileName: action.payload,
      };
    },

    setBasicInfo(state, action) {
      return {
        ...state,
        shortName: action.payload.shortName,
        name: action.payload.name,
        jobTitle: action.payload.jobTitle,
        contact: action.payload.contact,
        education: action.payload.education,
      };
    },
    setSummary(state, action) {
      return {
        ...state,
        summary: action.payload,
      };
    },
    setWorkExperience(state, action) {
      return {
        ...state,
        workExperience: action.payload,
      };
    },
    setWorkExperienceArray(state, action) {
      return {
        ...state,
        workExperienceArray: action.payload.workExperienceArray,
      };
    },
    setPrimarySkills(state, action) {
      return {
        ...state,
        primarySkills: action.payload.primarySkills,
      };
    },
    setSecondarySkills(state, action) {
      return {
        ...state,
        secondarySkills: action.payload.secondarySkills,
      };
    },
    setProfessionalSkills(state, action) {
      return {
        ...state,
        professionalSkills: action.payload.professionalSkills,
      };
    },

    // setLoadingState(state, action) {
    //   return {
    //     ...state,
    //     loadingState: action.payload,
    //   };
    // },
  },
});

export const {
  setUploadedFileName,
  setBasicInfo,
  setSummary,
  setWorkExperience,
  setPrimarySkills,
  setSecondarySkills,
  setProfessionalSkills,
  setId,
  setState,
  setResume,
  setField,
  setWorkExperienceArray,
  resetResume,
  emptyResume,
  // setLoadingState,
} = resumeSlice.actions;

export default resumeSlice.reducer;
