import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userSlice from "../slices/userSlice";
import photoReducer from "../slices/photoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    photo: photoReducer,
  },
});
