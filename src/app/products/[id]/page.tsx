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
import Rating from "@/components/product/Rating";
import ProductLabel from "@/components/product/label";

const ProductDetail = () => {
  const { id } = useParams();

  const [activeImg, setActiveImg] = useState(0);
  const dispatch = useAppDispatch();
  const { isLoading, product } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id, dispatch]);

  const { brand, price, rating, title, description, images, category } =
    product;

  return (
    <section className="bg-secondary p-4 sm:p-14">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* product image */}
          <div className="flex flex-col gap-y-6 ">
            <div className="min-h-[500px]">
              <Image
                src={images[activeImg]}
                alt="product"
                width={100}
                height={100}
                className="h-full w-full"
                onLoad={(e) => console.log(e)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => {
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

          {/* product content */}
          <div className="flex flex-col gap-y-4">
            <h3 className="font-semibold text-5xl capitalize">{title}</h3>
            <p className="text-base font-semibold">Price: ${price}</p>
            <p className="text-sm">{description}</p>
            <p className="text-sm">
              <span className="font-medium">Category</span>: {category}
            </p>
            <ProductLabel text={brand} />
            <Rating rating={rating} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
