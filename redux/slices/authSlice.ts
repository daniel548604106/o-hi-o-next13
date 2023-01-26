import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { addAxiosToken } from "@/axios";
import Cookies from "js-cookie";

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: any | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      const { accessToken, user } = action.payload;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.user = user;

      //     localStorage.setItem("user", JSON.stringify(user));
      addAxiosToken(accessToken);
      Cookies.set("accessToken", accessToken);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.user = null;
      Cookies.remove("accessToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
