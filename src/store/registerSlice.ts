import { createSlice } from "@reduxjs/toolkit";
import { Education, WorkExperience } from "./userDataSlice";

interface RegisterSlice {
  scrappedContent: string;
  activeStep: number;
  isSubmitting: boolean;
  error: string;
  terms: boolean;
  scrapped: {
    basic: boolean;
    education: boolean;
    workExperience: boolean;
    skills: boolean;
  };
  scrapping: {
    basic: boolean;
    education: boolean;
    workExperience: boolean;
    skills: boolean;
  };
  stepOne: {
    firstName?: string;
    lastName?: string;
    isValid: boolean;
  };
  stepTwo: {
    phoneNumber?: string;
    Email?: string;
    isValid: boolean;
    emailInvalid: boolean;
    linkedin?: string;
  };
  stepThree: {
    country?: string;
    street?: string;
    cityState?: string;
    postalCode?: string;
    isValid: boolean;
  };
  stepFour: {
    list?: Education[];
    isValid: boolean;
    editId?: string;
    state: string;
  };
  stepFive: {
    list?: WorkExperience[];
    editId?: string;
    state: string;
    isValid: boolean;
  };
  stepSix: {
    list: string[];
    isValid: boolean;
  };
  stepEight: {
    password: string;
    cPassword: string;
    isValid: boolean;
  };
}

const initialState: RegisterSlice = {
  scrappedContent: "",
  activeStep: 0,
  isSubmitting: false,
  terms: false,
  error: "",
  scrapped: {
    basic: false,
    education: false,
    workExperience: false,
    skills: false,
  },
  scrapping: {
    basic: false,
    education: false,
    workExperience: false,
    skills: false,
  },
  stepOne: {
    firstName: "",
    lastName: "",
    isValid: false,
  },
  stepTwo: {
    phoneNumber: "",
    Email: "",
    isValid: false,
    emailInvalid: false,
  },
  stepThree: {
    country: "",
    street: "",
    cityState: "",
    postalCode: "",
    isValid: true,
  },
  stepFour: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepFive: {
    list: [],
    state: "show",
    editId: "",
    isValid: true,
  },
  stepSix: {
    list: [],
    isValid: true,
  },
  stepEight: {
    password: "",
    cPassword: "",
    isValid: false,
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setActiveStep(state, action) {
      return {
        ...state,
        activeStep: action.payload,
      };
    },
    setScrapped(state, action) {
      return {
        ...state,
        scrapped: {
          ...state.scrapped,
          ...action.payload,
        },
      };
    },
    setScrapping(state, action) {
      return {
        ...state,
        scrapping: {
          ...state.scrapping,
          ...action.payload,
        },
      };
    },
    setIsSubmitting(state, action) {
      return {
        ...state,
        isSubmitting: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setTerms(state, action) {
      return {
        ...state,
        terms: action.payload,
      };
    },
    setStepOne(state, action) {
      return {
        ...state,
        stepOne: {
          ...state.stepOne,
          ...action.payload,
        },
      };
    },
    setStepTwo(state, action) {
      return {
        ...state,
        stepTwo: {
          ...state.stepTwo,
          ...action.payload,
        },
      };
    },
    setStepThree(state, action) {
      return {
        ...state,
        stepThree: {
          ...state.stepThree,
          ...action.payload,
        },
      };
    },
    setStepFour(state, action) {
      return {
        ...state,
        stepFour: {
          ...state.stepFour,
          ...action.payload,
        },
      };
    },
    setStepFive(state, action) {
      return {
        ...state,
        stepFive: {
          ...state.stepFive,
          ...action.payload,
        },
      };
    },
    setStepSix(state, action) {
      return {
        ...state,
        stepSix: {
          ...state.stepSix,
          ...action.payload,
        },
      };
    },
    setStepEight(state, action) {
      return {
        ...state,
        stepEight: {
          ...state.stepEight,
          ...action.payload,
        },
      };
    },
    setField(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const {
  setActiveStep,
  setIsSubmitting,
  setError,
  setTerms,
  setScrapped,
  setScrapping,
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
  setStepFive,
  setStepSix,
  setStepEight,
  setField,
} = registerSlice.actions;

export default registerSlice.reducer;
