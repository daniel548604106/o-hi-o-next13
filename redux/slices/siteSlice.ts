import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface SiteState {
  logo: string | null;
  meta: {
    title: string;
    description: string;
  } | null;
}

// Define the initial state using that type
const initialState: SiteState = {
  logo: null,
  meta: null,
};

export const siteSlice = createSlice({
  name: "site",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = siteSlice.actions;

export default siteSlice.reducer;
