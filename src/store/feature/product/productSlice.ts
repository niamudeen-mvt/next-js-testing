import { ProductType } from "@/utils/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

type ProductState = {
  isLoading: boolean;
  product: ProductType;
  error: boolean;
};
const initialState: ProductState = {
  isLoading: false,
  product: {
    id: 0,
    brand: "",
    title: "",
    description: "",
    rating: 0,
    category: "",
    thumbnail: "",
    images: [],
    price: 0,
  },
  error: false,
};

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId: any) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/${productId}`
      ).then((res) => res.json());
      return res;
    } catch (error) {}
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
export const selectProduct = (state: RootState) => state.product;
