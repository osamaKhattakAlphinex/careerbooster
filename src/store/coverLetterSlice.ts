// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface ICoverLetter {
  coverLetter: any;
}

const initialState: ICoverLetter = {
  coverLetter: {},
};

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    resetCoverLetter(state, action) {
      return initialState;
    },
    setCoverLetter(state, action) {
      return {
        ...state,
        coverLetter: action.payload,
      };
    },
  },
});

export const { resetCoverLetter, setCoverLetter } = coverLetterSlice.actions;

export default coverLetterSlice.reducer;
