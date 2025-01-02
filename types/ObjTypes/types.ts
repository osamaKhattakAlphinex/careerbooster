import { ApplicantProfile } from "@/components/public-pages/find-jobs/SingleJobCard";
import {
  Award,
  Certification,
  Education,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  Tours,
  Training,
  WorkExperience,
} from "@/store/userDataSlice";
import { string } from "yup";

export type CoverLetterCard = {
  jobDescription: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  coverLetterText: string;
  generatedOnDate: string;
  generatedViaOption: string;
  userEmail: string;
};
export type EmailCard = {
  id: string;
  jobDescription: string;
  emailText: string;
  generatedOnDate: string;
  generatedViaOption: string;
  userEmail: string;
  emailFirstFollowUpText?: string;
  emailSecondFollowUpText?: string;
};
export type ResumeCard = {};
export type LinkedinHeadlineCard = {};
export type LinkedinAboutCard = {};
export type LinkedinJobDescCard = {};
export type LinkedinKeywordsCard = {};

export type AiInputUserDataType = {
  contact?: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };
  education?: Education[];
  email: string;
  experience?: WorkExperience[];
  firstName: string;
  lastName: string;
  phone?: string;
  skills?: string[];
};

export type UserDataMinType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contact: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };
  skills: string[];
  education: Education[];
  files: [];
};
export type UserDataType = {
  _id: string;
  isFetched: boolean;
  isLoading: boolean;
  error: string;
  firstName: string;
  lastName: string;
  expectedSalary: string;
  desiredJobTitle: string;
  locationPreference: string;
  industry: string;
  company?: string;
  phone?: string;
  email?: string;
  role?: string;
  userCredits?: number;
  summary?: string;
  contact?: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
  };
  status: boolean;
  OpenAiTokensUsed: Number;
  createdAt?: Date;
  totalCredits: number;
  tours: Tours;
  resumes: [];
  consultingBids: [];
  coverLetters: [];
  emails: [];
  linkedInAbouts: [];
  linkedInHeadlines: [];
  linkedInJobDescriptions: [];
  linkedInKeywords: [];
  trialResume?: boolean;
  redeemedCoupons: [];
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
  uploadedResume: { fileName: string; fileContent: string };
  chatThreads?: { assistant_id: string; threads: string[] } | {};
  skills?: string[];
  defaultResumeFile: string;
  wizardCompleted: boolean;
  wizardReviewed: boolean;
  creditPackage?: "";
  profileImage?: string;
};

export type SingleJob = {
  _id: string;
  jobTitle: string;
  location: string;
  employer: string;
  category: string;
  jobDescription: string | TrustedHTML;
  link: string;
  skills: string[];
  applicationProfiles: ApplicantProfile[];
  addedByUserId: string;
  addedBy: "employer" | "deo";
  noOfProposals: number;
  status: string;
  featured: number;
  updatedAt: Date;
};
