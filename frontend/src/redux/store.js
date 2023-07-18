import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import filesSlice from "./slices/files";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    files: filesSlice,
  },
});
