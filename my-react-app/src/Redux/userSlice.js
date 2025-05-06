// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  userName: null, // Ajout du champ userName
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUserName: (state, action) => {
      state.userName = action.payload; // Ajout de l'action pour le nom de l'utilisateur
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = null; // Réinitialise le nom d'utilisateur lors de la déconnexion
    },
  },
});

export const { setToken, setUserName, logout } = userSlice.actions;
export default userSlice.reducer;
