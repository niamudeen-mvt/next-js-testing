import { ProductType } from "@/utils/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

type ProductState = {
  isLoading: boolean;
  products: ProductType[];
  error: boolean;
};
const initialState: ProductState = {
  isLoading: false,
  products: [],
  error: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await fetch("https://dummyjson.com/products").then((res) =>
        res.json()
      );
      return res;
    } catch (error) {}
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
export const selectProducts = (state: RootState) => state.products;
