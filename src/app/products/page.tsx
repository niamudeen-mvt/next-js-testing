"use client";

import React, { useEffect, useState } from "react";
import {
  getProducts,
  selectProducts,
} from "@/store/feature/product/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Categories from "@/components/product/Categories";
import CustomSearchInput from "@/components/shared/CustomSearchInput";
import ProductCard from "@/components/product/ProductCard";
import Loader from "@/components/shared/Loader";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchValue === "" && activeCategory) {
      dispatch(getProducts(activeCategory));
    }
  }, [activeCategory, searchValue, dispatch]);

  const TITLE = `Products${
    activeCategory === "all" ? "" : `/${activeCategory}`
  }`;

  return (
    <section>
      {isLoading && <Loader />}
      <div className="flex flex-col gap-y-8">
        <h1 className="font-semibold text-3xl px-8">{TITLE}</h1>
        <div className="flex justify-between">
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
            <p className="text-xs">No Products to Show</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
