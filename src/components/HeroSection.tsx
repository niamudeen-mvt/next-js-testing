import React from "react";
import Image from "next/image";
import bannerImage from "../../public/assets/banner.jpg";

const HeroSection = () => {
  return (
    <div className="min-h-[90vh] w-full relative">
      <Image
        src={bannerImage}
        alt="slider"
        className="rounded-3xl absolute h-full object-cover"
        priority={true}
      />
      <div className="absolute bottom-0 font-semibold text-white p-10 sm:p-20  z-10 flex flex-col gap-y-2 ">
        <h3 className="capitalize">Featured</h3>
        <h1 className="text-4xl capitalize">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
        </h1>
        <p className="text-sm">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here, content , making it look
          like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search
          for lorem will uncover many web sites still in their infancy.
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[transparent] to-[rgba(0,0,0,0.8)]"></div>
    </div>
  );
};

export default HeroSection;
