import { ProductType } from "@/utils/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";

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
  async (category: string) => {
    try {
      let res;
      if (category === "all") {
        res = await fetch("https://dummyjson.com/products").then((res) =>
          res.json()
        );
      } else {
        res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        ).then((res) => res.json());
      }
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchValue: string) => {
    try {
      let res = await fetch(
        `https://dummyjson.com/products/search?q=${searchValue}`
      ).then((res) => res.json());

      console.log(res, "res");
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get products
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
      })
      // search products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
export const selectProducts = (state: RootState) => state.products;
