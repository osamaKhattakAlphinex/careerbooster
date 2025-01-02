import { createSlice } from "@reduxjs/toolkit";

interface IAbout {
  id: string;
  aboutText: string;
  generatedOnDate: string;
  userEmail: string;
}

const initialState: IAbout = {
  id: "",
  aboutText: "",
  generatedOnDate: "",
  userEmail: "",
};

const linkedInAboutSlice = createSlice({
  name: "linkedInAbouts",
  initialState,
  reducers: {
    resetLinkedInAbout() {
      return initialState;
    },
    setLinkedInAbout(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetLinkedInAbout, setLinkedInAbout } =
  linkedInAboutSlice.actions;

export default linkedInAboutSlice.reducer;
