import { createSlice } from "@reduxjs/toolkit";

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
  userId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  role?: string;
  totalCredits?: number;
  contact?: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };
  education?: Education[];
  experience?: WorkExperience[];
  files?: string[];
  uploadedResume: { fileName: string; fileContent: string } | {};
  chatThreads?: { assistant_id: string; threads: string[] } | {};
  skills?: string[];
  defaultResumeFile: string;
  wizardCompleted: boolean;
  wizardReviewed: boolean;
  userPackage: "";
  userPackageData: {};
  userPackageUsed: limitObject | {};


}

const initialState: UserDataSlice = {
  isFetched: false,
  isLoading: false,
  error: "",
  userId: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "",
  contact: {
    country: "",
    street: "",
    cityState: "",
    postalCode: "",
  },
  education: [],
  experience: [],
  files: [],
  uploadedResume: {},
  chatThreads: {},
  totalCredits: 0,
  skills: [],
  defaultResumeFile: "",
  wizardCompleted: false,
  wizardReviewed: false,
  userPackage: "",
  userPackageData: {},
  userPackageUsed: {},


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
    setUserData(state, action) {
      return {
        // isLoading: state.isLoading,
        // error: state.error,
        ...state,
        ...action.payload,
      };
    },


  },
});

export const { setIsLoading, setError, setField, setUserData } =
  userDataSlice.actions;

export default userDataSlice.reducer;
