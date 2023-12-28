import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  cartCount: number;
};

const initialState: CartState = {
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartCount: (state, { payload }) => {
      state.cartCount = payload;
    },
  },
});

export const { updateCartCount } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
