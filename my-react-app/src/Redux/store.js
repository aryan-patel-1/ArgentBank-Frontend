import { configureStore } from "@reduxjs/toolkit"; 
import userReducer from "./userSlice"; // gère l'utilisateur

export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store; 
