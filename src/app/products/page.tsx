"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getProducts,
  selectProducts,
} from "@/store/feature/product/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import Loader from "@/components/shared/Loader";
import Categories from "@/components/product/Categories";
// import CustomSearchInput from "@/components/shared/CustomSearchInput";

const Products = () => {
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const { isLoading, products } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts(activeCategory));
  }, [activeCategory]);

  const TITLE = `Products${
    activeCategory === "all" ? "" : `/${activeCategory}`
  }`;

  // const handleSearchProduct = () => {
  //   fetch(`https://dummyjson.com/products/search?q=${searchValue}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data), setSearchValue("");
  //     });
  // };
  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-y-8">
          <h1 className="font-semibold text-3xl px-8">{TITLE}</h1>
          <div className="flex justify-end">
            {/* <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearchProduct}
            /> */}
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 &&
              products.map(
                ({ id, price, rating, thumbnail, title, description }) => {
                  return (
                    <div
                      key={id}
                      className="min-h-[350px] max-w-[280px] bg-gray-300/25 p-8 mx-auto"
                    >
                      <div
                        className="h-[150px] w-full mb-4
                  "
                      >
                        <Image
                          src={thumbnail}
                          alt="thumbnail"
                          width={100}
                          height={100}
                          className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-col gap-y-4">
                        <Link href={`/products/${id}`}>
                          <h3 className="font-semibold hover:text-blue-600">
                            {title}
                          </h3>
                        </Link>
                        <p className="text-sm">{description}</p>
                        <p className="text-sm font-semibold">${price}</p>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
