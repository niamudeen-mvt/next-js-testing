"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeProduct, selectCart } from "@/store/feature/cart/cartSlice";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@/components/product/Rating";

const CartPage = () => {
  const { products: cartProducts } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <section>
      <div className="w-[75%] mx-auto flex flex-col gap-y-8 py-10">
        <div className="grid grid-cols-1 gap-6 ">
          {cartProducts.length ? (
            cartProducts.map(
              ({ _id: id, price, rating, thumbnail, title, description }) => {
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
                        className="w-20 h-20 hover:scale-105 transition-all duration-500 cursor-pointer"
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
    </section>
  );
};

export default CartPage;
