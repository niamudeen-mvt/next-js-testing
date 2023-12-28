"use client";

import React, { useEffect, useState } from "react";
import {
  getProducts,
  selectProducts,
} from "@/store/feature/product/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Categories from "@/components/product/Categories";
import CustomSearchInput from "@/components/shared/CustomSearchInput";
import Loader from "@/components/shared/Loader";
import ProductCard from "@/components/product/ProductCard";
import { DEFAULT_CATEGORY } from "@/utils/constants";
import ProductsListing from "@/components/product/ProductList";

const Products = () => {
  // const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  // const [searchValue, setSearchValue] = useState("");
  // const { isLoading, products } = useAppSelector(selectProducts);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (searchValue === "" && activeCategory) {
  //     dispatch(getProducts(activeCategory));
  //   }
  // }, [activeCategory, searchValue, dispatch]);

  // const TITLE = `Products${
  //   activeCategory === DEFAULT_CATEGORY ? "" : `/${activeCategory}`
  // }`;

  return (
    <section>
      <ProductsListing />
    </section>
  );
};

export default Products;
