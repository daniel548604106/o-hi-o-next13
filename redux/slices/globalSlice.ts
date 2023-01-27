import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface GlobalState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  theme: "light" | "dark";
}

// Define the initial state using that type
const initialState: GlobalState = {
  isLoading: false,
  isSidebarOpen: false,
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleSidebarOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setIsLoading, toggleSidebarOpen } = globalSlice.actions;

export default globalSlice.reducer;
