import { createSlice } from "@reduxjs/toolkit";

interface IJobDescription {
  id: string;
  jobDescriptionText: string;
  generatedOnDate: any;
  userEmail: string;
}

const initialState: IJobDescription = {
  id: "",
  jobDescriptionText: "",
  generatedOnDate: "",
  userEmail: "",
};

const linkedInJobDescriptionSlice = createSlice({
  name: "linkedInJobDescriptions",
  initialState,
  reducers: {
    resetLinkedInJobDescription() {
      return initialState;
    },
    setLinkedInJobDescription(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetLinkedInJobDescription, setLinkedInJobDescription } =
  linkedInJobDescriptionSlice.actions;

export default linkedInJobDescriptionSlice.reducer;
