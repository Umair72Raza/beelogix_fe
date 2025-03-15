import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobsSlice";
import applicationsReducer from "./applicationSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    applications: applicationsReducer,
  },
});

export default store;
