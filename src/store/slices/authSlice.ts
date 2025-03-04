import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userName: string | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken"),
  userName: null,
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userName = action.payload.user.name;
      state.userEmail = action.payload.user.email; 
      localStorage.setItem("authToken", action.payload.token);
     
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      state.userEmail = null; 
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
