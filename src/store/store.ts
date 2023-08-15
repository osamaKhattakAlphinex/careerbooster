import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import resumeReducer from "./resumeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
