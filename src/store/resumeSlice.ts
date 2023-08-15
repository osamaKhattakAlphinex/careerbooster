// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface ResumeSlice {
  uploadedFileName: string;
}

const initialState: ResumeSlice = {
  uploadedFileName: "",
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setUploadedFileName(state, action) {
      return {
        ...state,
        uploadedFileName: action.payload,
      };
    },
  },
});

export const { setUploadedFileName } = resumeSlice.actions; // Make sure to export these functions

export default resumeSlice.reducer;
