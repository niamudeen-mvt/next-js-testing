"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import api from "@/utils/axios";
import Link from "next/link";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log(res, "producsts");

      if (res.status === 200) {
        setProducts(res.data.products);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section>
      {/* <h1 className="font-semibold text-3xl my-10">Trending Products</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length
          ? products.map(
              ({ _id, price, rating, thumbnail, title, description }) => {
                console.log();
                return (
                  <div
                    key={_id}
                    className="min-h-[350px] max-w-[280px] shadow-md p-5"
                  >
                    <div className="h-[250px] mb-4 flex__center">
                      <Image
                        src={thumbnail}
                        width={150}
                        height={150}
                        alt="thumbnail"
                        className="h-60 w-h-60   hover:scale-105 common__transition cursor-pointer object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <Link href={`/products/${_id}`}>
                        <h3 className="font-semibold hover:text-blue-600 capitalize">
                          {title}
                        </h3>
                      </Link>
                      <p className="text-sm">{description}</p>
                      <p className="text-sm font-semibold">${price}</p>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>
    </section>
  );
};

export default ProductsListing;
