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
import { removeProduct, selectCart } from "@/store/feature/cart/cartSlice";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@/components/product/Rating";
import { DEFAULT_CATEGORY } from "@/utils/constants";

const CartPage = () => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useAppSelector(selectProducts);
  const { products: cartProducts } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const filterdProducts =
    activeCategory === DEFAULT_CATEGORY
      ? cartProducts
      : cartProducts.filter((product) => product.category === activeCategory);
  // const filterdProducts =
  //   activeCategory === DEFAULT_CATEGORY
  //     ? cartProducts
  //     : cartProducts.filter(
  //         (product) =>
  //           product.title.includes(searchValue.toLowerCase()) ||
  //           product.description.includes(searchValue.toLowerCase()) ||
  //           product.category.includes(searchValue.toLowerCase())
  //       );

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[75%] mx-auto flex flex-col gap-y-8 py-10">
          <div className="flex justify-end">
            {/* <CustomSearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            /> */}
            <Categories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 ">
            {filterdProducts.length ? (
              filterdProducts.map(
                ({ id, price, rating, thumbnail, title, description }) => {
                  return (
                    <div
                      key={id}
                      className="w-full bg-gray-300/25 p-8 mx-auto flex gap-10"
                    >
                      <div className="w-1/3 mb-4">
                        <Image
                          src={thumbnail}
                          alt="thumbnail"
                          width={100}
                          height={100}
                          className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-y-4">
                        <div className="w-full flex justify-between ">
                          <h3 className="font-semibold hover:text-blue-600 capitalize">
                            {title}
                          </h3>
                          <IoCloseSharp
                            className="cursor-pointer"
                            onClick={() => handleRemoveProduct(id)}
                          />
                        </div>

                        <p className="text-sm">{description}</p>
                        <p className="text-sm font-semibold">${price}</p>
                        <Rating rating={rating} />
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <p className="text-xs px-8">No Products to Show</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
