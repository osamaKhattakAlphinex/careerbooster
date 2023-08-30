import { createSlice } from "@reduxjs/toolkit";

export interface Education {
  id: string;
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
  id: string;
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
interface RegisterSlice {
  activeStep: number;
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
}

const initialState: RegisterSlice = {
  activeStep: 0,
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
    isValid: false,
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
  },
});

export const {
  setActiveStep,
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
  setStepFive,
  setStepSix,
} = registerSlice.actions;

export default registerSlice.reducer;
