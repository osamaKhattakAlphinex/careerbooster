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
  headings :{
    education: string;
    primarySkills: string;
    workExperienceArray: string;
    summary: string;
    contact: string;
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
    address:string;
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
  quantifyingExperience: boolean;
  workExperience: "";
  customExperienceArray:[];
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
  headings :{
    education: "education",
    primarySkills: "skills",
    workExperienceArray: "work experience",
    summary: "executive summary",
    contact: "contact",
  },

  dateTime: "",
  id: "",
  uploadedFileName: "",
  shortName: "",
  name: "",
  jobTitle: "",
  contact: {
    email: "",
    phone: "",
    linkedIn: "",
    address:""
    
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
  customExperienceArray: [],
  quantifyingExperience: true,
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
    setQuantifyingExperience(state, action) {
      return {
        ...state,
        quantifyingExperience: action.payload,
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
    setHeadings(state, action) {
      return {
        ...state,
        education: action.payload.education,
        primarySkills: action.payload.primarySkills,
        workExperienceArray: action.payload.workExperienceArray,
        summary: action.payload.summary,
        contact:  action.payload.contact,
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
    setCustomExperienceArray(state, action) {
      return {
        ...state,
        customExperienceArray: action.payload,
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
  setHeadings,
  setWorkExperienceArray,
  resetResume,
  emptyResume,
  setQuantifyingExperience,
  setCustomExperienceArray
  // setLoadingState,
} = resumeSlice.actions;

export default resumeSlice.reducer;
