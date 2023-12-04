// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface IEmail {
  id: string;
  jobDescription: string;
  emailText: string;
  generatedOnDate: any;
  generatedViaOption: string;
  userEmail: string;
}

const initialState: IEmail = {
  id: "",
  jobDescription: "",
  emailText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
};

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    resetEmail() {
      return initialState;
    },
    setEmail(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetEmail, setEmail } = emailSlice.actions;

export default emailSlice.reducer;
