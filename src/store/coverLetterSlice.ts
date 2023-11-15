// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface ICoverLetter {
  id: string;
  jobDescription: string;
  coverLetterText: string;
  generatedOnDate: any;
  generatedViaOption: string;
  userEmail: string;
}

const initialState: ICoverLetter = {
  id: "",
  jobDescription: "",
  coverLetterText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
};

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    resetCoverLetter() {
      return initialState;
    },
    setCoverLetter(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetCoverLetter, setCoverLetter } = coverLetterSlice.actions;

export default coverLetterSlice.reducer;
