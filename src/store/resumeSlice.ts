// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface ResumeSlice {
  file: any;
}

const initialState: ResumeSlice = {
  file: {},
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setFile(state, action) {
      return {
        ...state,
        file: action.payload.file,
      };
    },
  },
});

export const { setFile } = resumeSlice.actions; // Make sure to export these functions

export default resumeSlice.reducer;
