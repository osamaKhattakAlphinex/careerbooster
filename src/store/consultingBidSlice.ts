// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface IConsultingBid {
  id: string;
  jobDescription: string;
  consultingBidText: string;
  generatedOnDate: any;
  generatedViaOption: string;
  userEmail: string;
}

const initialState: IConsultingBid = {
  id: "",
  jobDescription: "",
  consultingBidText: "",
  generatedOnDate: "",
  generatedViaOption: "",
  userEmail: "",
};

const consultingBidSlice = createSlice({
  name: "consultingBid",
  initialState,
  reducers: {
    resetConsultingBid() {
      return initialState;
    },
    setConsultingBid(state, action) {
      return {
        ...action.payload,
      };
    },
  },
});

export const { resetConsultingBid, setConsultingBid } =
  consultingBidSlice.actions;

export default consultingBidSlice.reducer;
