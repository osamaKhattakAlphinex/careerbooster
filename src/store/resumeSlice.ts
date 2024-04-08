// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface WorkExperience {
  title: string;
  company?: string;
  country?: string;
  cityState?: string;
  fromMonth?: string;
  fromYear?: string;
  isContinue?: boolean;
  toMonth?: string;
  toYear?: string;
  achievements?: string[];
}
interface Training {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}
interface Publication {
  title: string;
  publisher: string;
  date: string;
  description: string[];
}

interface Award {
  title: string;
  awardingOrganization: string;
  date: string;
  description: string;
}

interface Reference {
  name: string;
  position: string;
  company: string;
  contactInformation: string; // This could include email, phone number, etc.
}

interface Certification {
  title: string;
  issuingOrganization: string;
  date: string;
  description: string;
}

interface Interest {
  name: string;
  description: string;
}

interface Language {
  language: string;
  proficiency: string; // This could be levels like beginner, intermediate, advanced, or specific proficiency scores
}

export interface Resume {
  state: {
    jobPosition: string;
    resumeLoading: boolean;
    componentRef: any;
  };
  headings: {
    education: string;
    primarySkills: string;
    workExperienceArray: string;
    summary: string;
    contact: string;
    publications:string; 
    trainings:string;
    awards:string;
    interests:string;
    certifications:string;
    references:string;
    languages:string;

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
    address: string;
  };
  education: [
    {
      school: string;
      degree: string;
      year: string;
    }
  ];
  sections: {
    contact: boolean;
    summary: boolean;
    shortName: boolean;
    name: boolean;
    jobTitle: boolean;
    workExperience: boolean;
    primarySkills: boolean;
    languages: boolean;
    certifications: boolean;
    awards: boolean;
    publications: boolean;
    references: boolean;
    interests: boolean;
  };

  summary: string;
  workExperienceArray: WorkExperience[];
  quantifyingExperience: boolean;
  workExperience: "";
  primarySkills: [];
  professionalSkills: [];
  secondarySkills: [];
  languages: Language[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  trainings: Training[];
  references: Reference[];
  interests: Interest[];
}

const initialState: Resume = {
  state: {
    jobPosition: "",
    resumeLoading: false,
    componentRef: null,
  },
  headings: {
    education: "education",
    primarySkills: "skills",
    workExperienceArray: "work experience",
    summary: "executive summary",
    contact: "contact",
    publications: "publications",
    references: "references",
    interests: "interests & hobbies",
    certifications: "certifications",
    awards: "awards",
    trainings: "trainings",
    languages: "languages",
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
    address: "",
  },
  education: [
    {
      school: "",
      degree: "",
      year: "",
    },
  ],
  sections: {
    contact: true,
    summary: true,
    shortName: true,
    name: true,
    jobTitle: true,
    workExperience: true,
    primarySkills: true,
    languages: false,
    certifications: false,
    awards: false,
    publications: false,
    references: false,
    interests: false,
  },
  summary: "",
  workExperienceArray: [],
  quantifyingExperience: true,
  workExperience: "",
  primarySkills: [],
  professionalSkills: [],
  secondarySkills: [],
  interests: [],
  awards: [],
  publications: [],
  trainings:[],
  references: [],
  languages: [],
  certifications: [],
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
        contact: action.payload.contact,
        publications: action.payload.publications,
        references: action.payload.references,
        interests: action.payload.interests,
        certifications: action.payload.certifications,
        trainings: action.payload.trainings,
        awards: action.payload.awards,
        languages: action.payload.languages,
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
    setTrainings(state, action) {
      return {
        ...state,
        trainings: action.payload.trainings,
      };
    },
    setAwards(state, action) {
      return {
        ...state,
        awards: action.payload.awards,
      };
    },
    setPublications(state, action) {
      return {
        ...state,
        publications: action.payload.publications,
      };
    },
    setReferences(state, action) {
      return {
        ...state,
        references: action.payload.references,
      };
    },
    setInterests(state, action) {
      return {
        ...state,
        interests: action.payload.interests,
      };
    },
    setCertifications(state, action) {
      return {
        ...state,
        certifications: action.payload.certifications,
      };
    },
    setLanguages(state, action) {
      return {
        ...state,
        languages: action.payload.languages,
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
  setTrainings,
  setAwards,
  setPublications,
  setReferences,
  setInterests,
  setCertifications,
  setLanguages,
  // setLoadingState,
} = resumeSlice.actions;

export default resumeSlice.reducer;
