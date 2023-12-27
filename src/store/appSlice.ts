// src/store/counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";

type AppType = {
  openUpgradeModal: boolean;
};

const initialState: AppType = {
  openUpgradeModal: false,
};

const appSlice = createSlice({
  name: "consultingBid",
  initialState,
  reducers: {
    resetConsultingBid() {
      return initialState;
    },
    setUpgradeModal(state, action) {
      return {
        ...state,
        openUpgradeModal: action.payload,
      };
    },
  },
});

export const { resetConsultingBid, setUpgradeModal } = appSlice.actions;

export default appSlice.reducer;
