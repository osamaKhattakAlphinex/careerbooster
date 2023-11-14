import { configureStore } from "@reduxjs/toolkit";

import resumeReducer from "./resumeSlice";
import registerSlice from "./registerSlice";
import userDataSlice from "./userDataSlice";
import coverLetterSlice from "./coverLetterSlice";

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    register: registerSlice,
    userData: userDataSlice,
    coverLetter: coverLetterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
