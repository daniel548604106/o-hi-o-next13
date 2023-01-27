import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CartState {
  cartItems: {
    id: string;
    quantity: number;
    item: any;
  }[];
  isLoading: boolean;
  isCartOpen: boolean;
  subTotal: number;
}

// Define the initial state using that type
const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  isCartOpen: false,
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItemToCart: (state, action) => {},
    updateCartItem: (state, action) => {},
    removeItemFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(({ id }) => id !== idToRemove);
    },
    toggleCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  toggleCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
