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
  reducers: {},
});

export const {} = siteSlice.actions;

export default siteSlice.reducer;
