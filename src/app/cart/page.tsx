"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rating from "@/components/product/Rating";
import api from "@/utils/axios";
import { getFromStorage, sendNotifications } from "@/utils/helper";
import { useAppDispatch } from "@/store";
import { updateCartCount } from "@/store/feature/cart/cartSlice";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<any>([]);
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    try {
      const userId = getFromStorage("userId");
      if (userId) {
        let res = await api.get(`/cart/products/${userId}`);
        if (res.status === 200) {
          let copiedCartProducts = res.data.cart.products.map(
            (product: any) => {
              return {
                ...product,
                total: product.price,
              };
            }
          );
          setCartProducts(copiedCartProducts);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemoveProduct = async (id: string) => {
    try {
      let res = await api.delete(`/cart/product/remove/${id}`);
      if (res.status === 200) {
        dispatch(updateCartCount(res.data.cartCount));
        sendNotifications("success", res.data.message);
        fetchProducts();
      }
    } catch (error: any) {
      sendNotifications("warning", error.response.data.message);
    }
  };

  const subtotal: number = cartProducts?.reduce(
    (total: number, product: any) => {
      total = total + product.total;
      return total;
    },
    0
  );

  const handleQtyChange = (qty: number, index: number) => {
    let copiedCartProducts = [...cartProducts];
    copiedCartProducts[index].total = copiedCartProducts[index]?.price * qty;

    setCartProducts(copiedCartProducts);
  };
  return (
    <section>
      <div className="w-[75%] mx-auto flex flex-col gap-y-8 py-10">
        <div className="grid grid-cols-1 gap-6 ">
          {cartProducts?.length
            ? cartProducts.map(
                (
                  {
                    _id: id,
                    price,
                    rating,
                    thumbnail,
                    title,
                    description,
                    total,
                  }: any,
                  index: number
                ) => {
                  return (
                    <div
                      key={id}
                      className="w-full bg-gray-300/25 p-8 mx-auto flex gap-10"
                    >
                      <div className="w-1/3 mb-4">
                        <Image
                          priority={true}
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
                          <button
                            onClick={() => handleRemoveProduct(id)}
                            className="cursor-pointer"
                          >
                            X
                          </button>
                          {/* <IoCloseSharp className="cursor-pointer" /> */}
                        </div>

                        <p className="text-sm">{description}</p>
                        <p className="text-sm font-semibold">${price}</p>
                        <Rating rating={rating} />

                        <p>Total: {total}</p>
                        <select
                          className="w-[100px] bg-white text-xs py-1 outline-none"
                          onChange={(e) => {
                            handleQtyChange(+e.target.value, index);
                          }}
                        >
                          <option selected hidden>
                            Qty
                          </option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>
                  );
                }
              )
            : null}
        </div>
        {cartProducts?.length ? (
          <div className="flex justify-between items-center">
            <h1 className="font-medium">Subtotal</h1>
            <p>{subtotal}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CartPage;
