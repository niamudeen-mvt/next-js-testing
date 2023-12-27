import { RootState } from "@/store";
import { ProductType } from "@/utils/type";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  isLoading: boolean;
  products: ProductType[];
  error: boolean;
};

const initialState: CartState = {
  isLoading: false,
  products: [],
  error: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.products.push(payload);
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
    },
  },
});

export const { addToCart, removeProduct } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
