import { configureStore } from "@reduxjs/toolkit";

import resumeReducer from "./resumeSlice";
import registerSlice from "./registerSlice";

const store = configureStore({
  reducer: {
    resume: resumeReducer,
    register: registerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
