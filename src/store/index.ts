import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import productSlice from "./feature/product/productSlice";
import productsSlice from "./feature/product/productsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./feature/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
