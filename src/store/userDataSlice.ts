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

export interface Tours {
  resumeBuilder: boolean;
  coverLetter: boolean;
  emailAssistant: boolean;
  linkedinOptimizer: boolean;
  dashboard: boolean;
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
export interface Training {
  id?: string;
  title: string;
  company?: string;
  fromMonth?: string;
  fromYear?: string;
  toMonth?: string;
  toYear?: string;
  description?: string;
}

export interface Publication {
  id?: string;
  title?: string;
  publisher?: string;
  date?: string;
  description?: string;
}

export interface Award {
  id?: string;
  title?: string;
  awardingOrganization?: string;
  date?: string;
  description?: string;
}

export interface Reference {
  id?: string;
  name?: string;
  position?: string;
  company?: string;
  contactInformation?: string; // This could include email, phone number, etc.
}

export interface Certification {
  id?: string;
  title?: string;
  issuingOrganization?: string;
  date?: string;
  description?: string;
}

export interface Interest {
  id?: string;
  description?: string;
}

export interface Language {
  id?: string;
  language?: string;
  proficiency?: string; // This could be levels like beginner, intermediate, advanced, or specific proficiency scores
}

export interface Project {
  id?: string;
  title?: string;
  description?: string;
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
  resumes:[],
  consultingBids:[],
  coverLetters:[],
  emails:[],
  linkedInAbouts:[],
  linkedInHeadlines: [],
  linkedInJobDescriptions: [],
  linkedInKeywords: [],
  trialResume?: boolean;
  redeemedCoupons:[];
  linkedin?: string;
  education?: Education[];
  trainings?: Training[];
  languages?: Language[];
  interests?: Interest[];
  certifications?: Certification[];
  awards?: Award[];
  publications?: Publication[];
  references?: Reference[];
  experience?: WorkExperience[];
  projects?: Project[];
  files?: string[];
  uploadedResume: { fileName: string; fileContent: string } ;
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
  resumes: [],
  consultingBids:[],
  emails:[],
  coverLetters:[],
  linkedInAbouts:[],
  linkedInHeadlines:[],
  linkedInJobDescriptions: [],
  linkedInKeywords: [],
  education: [],
  experience: [],
  references: [],
  trainings: [],
  languages: [],
  interests: [],
  certifications: [],
  awards: [],
  publications: [],
  projects: [],
  files: [],
  uploadedResume: {fileName:"", fileContent: ""},
  chatThreads: {},
  userCredits: 0,
  skills: [],
  defaultResumeFile: "",
  wizardCompleted: false,
  wizardReviewed: false,
  creditPackage: "",
  trialResume: false,
  profileImage: "",
  redeemedCoupons: [],
  tours: {
    dashboard: false,
    resumeBuilder: false,
    coverLetter: false,
    emailAssistant: false,
    linkedinOptimizer: false,
  },
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
