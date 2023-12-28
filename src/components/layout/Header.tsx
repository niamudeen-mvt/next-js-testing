"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/utils/constants";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaSquareXing } from "react-icons/fa6";
import useWindowSize from "@/hooks/useWindowSize";
import CustomButton from "../shared/CustomButton";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store";
import { selectCart } from "@/store/feature/cart/cartSlice";
import { useAuth } from "@/context/AuthContext";
import { IoCartOutline } from "react-icons/io5";
import RoundedButton from "../shared/button";

const Header = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useAppSelector(selectCart);

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width >= 768) {
      setShowNav(false);
    }
  }, [windowSize.width]);

  return (
    <header
      className={`bg-white text-black p-5 flex justify-between items-center lg:container mx-auto sticky top-0 z-40`}
    >
      <Link href="/" className="size-10 z-50">
        <FaSquareXing className="size-8" />
      </Link>
      <nav
        className={`md:block ${
          showNav
            ? "fixed top-0 left-0 w-full h-full bg-white z-40 flex justify-center items-center"
            : "hidden"
        }`}
      >
        <ul
          className={`flex justify-between items-center gap-6 ${
            showNav ? "flex-col" : ""
          }`}
        >
          {menuItems.map(({ id, title, path }) => {
            return (
              <Link key={id} href={path} onClick={() => setShowNav(false)}>
                <li
                  className={`text-xs cursor-pointer  p-2 hover:bg-black hover:text-white active:bg-black active:text-white  rounded-md transition-all duration-300 capitalize ${
                    pathname === path ? "active" : ""
                  }`}
                >
                  {title}
                </li>
              </Link>
            );
          })}
          {showNav ? (
            <>
              <Link href="/login">
                <CustomButton text="Log in" path="/login" />
              </Link>
              <Link href="/signup">
                <CustomButton text="Signup" path="/signup" />
              </Link>
            </>
          ) : null}
        </ul>
      </nav>
      {isLoggedIn ? (
        <div className="flex items-center gap-x-5">
          <RoundedButton text="Logout" onClick={handleLogout} />
          <div className="relative ">
            <Link href="/cart">
              <IoCartOutline size={23} className="cursor-pointer" />
            </Link>
            {cartCount > 0 ? (
              <span className="bg-red-600 text-white text-xs size-4 rounded-full absolute -top-2 -right-2 flex__center">
                {cartCount}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="hidden gap-x-6 md:flex ">
          <Link href="/login">
            <CustomButton text="Log in" path="/login" />
          </Link>
          <Link href="/signup">
            <CustomButton text="Signup" path="/signup" />
          </Link>
        </div>
      )}

      {showNav ? (
        <IoCloseSharp
          onClick={() => setShowNav(!showNav)}
          className="text-black z-50 size-5 font-semibold"
        />
      ) : (
        <AiOutlineMenu
          onClick={() => setShowNav(!showNav)}
          className="text-black z-50 size-5 font-semibold md:hidden"
        />
      )}
    </header>
  );
};

export default Header;
