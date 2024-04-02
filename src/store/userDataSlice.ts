import { createSlice } from "@reduxjs/toolkit";
import { CustomSection } from "./registerSlice";

export interface Education {
  id?: string;
  educationLevel: string;
  fieldOfStudy?: string;
  schoolName?: string;
  schoolLocation?: string;
  fromMonth?: string;
  fromYear?: string;
  isContinue?: boolean;
  toMonth?: string;
  toYear?: string;
}

export interface CustomEntry {
  id?: string;
  title: string;
  country?: string;
  cityState?: string;
  fromMonth?: string;
  fromYear?: string;
  isContinue?: boolean;
  toMonth?: string;
  toYear?: string;
  description?: string;
}

export interface Tours {
  resumeBuilder: boolean;
  coverLetter: boolean;
  emailAssistant: boolean;
  linkedinOptimizer: boolean;
}

export interface WorkExperience {
  id?: string;
  jobTitle: string;
  company?: string;
  country?: string;
  cityState?: string;
  fromMonth?: string;
  fromYear?: string;
  isContinue?: boolean;
  toMonth?: string;
  toYear?: string;
  description?: string;
}

interface limitObject {
  resumes_generation: Number;
  keywords_generation: Number;
  headline_generation: Number;
  about_generation: Number;
  job_desc_generation: Number;
  cover_letter_generation: Number;
  email_generation: Number;
  pdf_files_upload: Number;
  review_resume: Number;
  consulting_bids_generation: Number;
}
interface UserDataSlice {
  isFetched: boolean;
  isLoading: boolean;
  error: string;
  // userId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?: string;
  userCredits?: number;
  contact?: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };

  tours: Tours;

  trialResume?: boolean;

  linkedin?: string;
  education?: Education[];
  customDetails?: CustomSection[];
  experience?: WorkExperience[];
  files?: string[];
  uploadedResume: { fileName: string; fileContent: string } | {};
  chatThreads?: { assistant_id: string; threads: string[] } | {};
  skills?: string[];
  defaultResumeFile: string;
  wizardCompleted: boolean;
  wizardReviewed: boolean;
  creditPackage?: "";
  profileImage?: string;
}

const initialState: UserDataSlice = {
  isFetched: false,
  isLoading: false,
  error: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  linkedin: "",
  role: "",
  contact: {
    country: "",
    street: "",
    cityState: "",
    postalCode: "",
  },
  customDetails: [],
  education: [],
  experience: [],
  files: [],
  uploadedResume: {},
  chatThreads: {},
  userCredits: 0,
  skills: [],
  defaultResumeFile: "",
  wizardCompleted: false,
  wizardReviewed: false,
  creditPackage: "",
  trialResume: false,
  profileImage: "",
  tours: {
    resumeBuilder: false,
    coverLetter: false,
    emailAssistant: false,
    linkedinOptimizer: false,
  },
  // userPackage: "",
  // userPackageData: {},
  // userPackageUsed: {},
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setField(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },

    setTours(state, action) {
      return {
        ...state,
        tours: {
          ...state.tours,
          ...action.payload.tour,
        },
      };
    },

    setUserData(state, action) {
      return {
        // isLoading: state.isLoading,
        // error: state.error,
        ...state,
        ...action.payload,
      };
    },

    setUserProfileImage(state, action) {
      return {
        ...state,
        profileImage: action.payload,
      };
    },
  },
});

export const {
  setIsLoading,
  setError,
  setField,
  setUserData,
  setUserProfileImage,
  setTours,
} = userDataSlice.actions;

export default userDataSlice.reducer;
