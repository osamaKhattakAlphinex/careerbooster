import { configureStore } from "@reduxjs/toolkit";

import resumeReducer from "./resumeSlice";
import registerSlice from "./registerSlice";
import userDataSlice from "./userDataSlice";
import coverLetterSlice from "./coverLetterSlice";
import emailSlice from "./emailSlice";
import consultingBidSlice from "./consultingBidSlice";

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    register: registerSlice,
    userData: userDataSlice,
    coverLetter: coverLetterSlice,
    emails: emailSlice,
    consultingBids: consultingBidSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
