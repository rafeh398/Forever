import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  // Import the reducer from your authSlice file

const store = configureStore({
  reducer: {
    auth: authReducer,  // Use the authReducer to handle authentication state
  }
});

export default store;
