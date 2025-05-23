import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userName: string | null;
  userEmail: string | null;
  // userHotels: number[] | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken"),
  userName: localStorage.getItem("userName"),
  userEmail: localStorage.getItem("userEmail"),
  // userHotels: JSON.parse(localStorage.getItem("userHotels") || "null"),
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
      // state.userHotels = action.payload.user.hotels || null;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userName", action.payload.user.name);
      localStorage.setItem("userEmail", action.payload.user.email);
      // localStorage.setItem("userHotels", JSON.stringify(action.payload.user.hotels || null));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      state.userEmail = null;
      // state.userHotels = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      // localStorage.removeItem("userHotels");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;