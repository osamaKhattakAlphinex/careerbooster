import { createSlice } from "@reduxjs/toolkit";

interface RegisterSlice {
  activeStep: number;
}

const initialState: RegisterSlice = {
  activeStep: 0,
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
  },
});

export const { setActiveStep } = registerSlice.actions;

export default registerSlice.reducer;
