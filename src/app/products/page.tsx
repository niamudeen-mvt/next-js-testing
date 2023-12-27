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

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchValue === "" && activeCategory) {
      dispatch(getProducts(activeCategory));
    }
  }, [activeCategory, searchValue, dispatch]);

  const TITLE = `Products${
    activeCategory === DEFAULT_CATEGORY ? "" : `/${activeCategory}`
  }`;

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-y-8 ">
          <h1 className="font-semibold text-3xl px-8">{TITLE}</h1>
          <div className="flex justify-between px-8">
            <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length ? (
              products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            ) : (
              <p className="text-xs px-8">No Products to Show</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
