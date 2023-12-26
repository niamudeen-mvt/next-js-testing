"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getSingleProduct,
  selectProduct,
} from "@/store/feature/product/productSlice";
import Loader from "@/components/shared/Loader";

const ProductDetail = () => {
  const { id } = useParams();

  const [activeImg, setActiveImg] = useState(0);
  const dispatch = useAppDispatch();
  const { isLoading, product } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  return (
    <section className="bg-secondary p-14">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div className="flex flex-col gap-y-6 ">
            <div className="min-h-[500px]">
              <Image
                src={product.images[activeImg]}
                alt="product"
                width={100}
                height={100}
                className="h-full w-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => {
                return (
                  <Image
                    key={index}
                    src={image}
                    alt="product"
                    width={100}
                    height={100}
                    onClick={() => setActiveImg(index)}
                    className="cursor-pointer"
                  />
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="bg-red-600 text-white text-xs max-w-[100px] w-full text-center py-2 rounded-md">
              {product.brand}
            </div>
            <h3 className="font-semibold text-5xl ">{product.title}</h3>
            <p className="text-base font-semibold">${product.price}</p>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">
              <span className="font-medium">Category</span>: {product.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
