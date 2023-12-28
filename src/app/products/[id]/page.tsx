"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Rating from "@/components/product/Rating";
import api from "@/utils/axios";
import { sendNotifications, testProduct } from "@/utils/helper";
import { updateCartCount } from "@/store/feature/cart/cartSlice";
import { useAppDispatch } from "@/store";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>({});
  const [activeImg, setActiveImg] = useState(0);
  const dispatch = useAppDispatch();

  const fetchProductDetails = async (id: any) => {
    try {
      let res = await api.get(`/products/${id}`);
      if (res.status === 200) {
        setProduct(res.data.product);
      }
    } catch (error: any) {
      sendNotifications("error", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const handleAddtoCart = async () => {
    try {
      let res = await api.post(`/cart/product/add/${id}`);
      if (res.status === 201) {
        dispatch(updateCartCount(res.data.cartCount));
        sendNotifications("success", res.data.message);
      }else if(res.status === 200){
        sendNotifications("warning", res.data.message);
      }
    } catch (error: any) {
      sendNotifications("warning", error.response.data.message);
    }
  };
  const { title, category, description, images, price, rating, thumbnail } =
    product;

  return (
    <section className="bg-secondary p-8 w-full sm:w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* product image */}
        <div className="flex flex-col gap-y-6 px-10">
          <div className="h-[500px] w-full relative mx-auto">
            <Image src={thumbnail} alt="product" fill />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images?.map((image: any, index: number) => {
              return (
                <Image
                  key={index}
                  src={image}
                  alt="product"
                  width={100}
                  height={100}
                  onClick={() => setActiveImg(index)}
                  className="cursor-pointer size-32"
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h3 className="font-semibold text-5xl capitalize">{title}</h3>
          <p className="text-base font-semibold">Price: ${price}</p>
          <p className="text-sm">{description}</p>
          <p className="text-sm">
            <span className="font-medium capitalize">Category</span>: {category}
          </p>
          <Rating rating={rating} />
          <button
            className={`bg-black text-white text-xs px-3 py-3 rounded-md hover:bg-black/75`}
            onClick={handleAddtoCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
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

          <div className="flex flex-col gap-y-4">
            <h3 className="font-semibold text-5xl capitalize">{title}</h3>
            <p className="text-base font-semibold">Price: ${price}</p>
            <p className="text-sm">{description}</p>
            <p className="text-sm">
              <span className="font-medium">Category</span>: {category}
            </p>
            <ProductLabel text={brand} />
            <Rating rating={rating} />
            <button
              className={`bg-black text-white text-xs px-3 py-3 rounded-md hover:bg-black/75`}
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )} */}
    </section>
  );
};

export default ProductDetail;
