"use client";
import React, { useEffect, useState } from "react";
import CustomDrodown from "../shared/CustomDropdown";

const Categories = ({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [productCategories, setProductCategories] = useState([]);

  const [showMenu, setShowMenu] = useState(false);

  const fetchCategories = async () => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setProductCategories(data));
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const dropdownListData = productCategories.map((category, index) => {
    if (index === 0) {
      return { title: "all" };
    } else {
      return { title: category };
    }
  });

  return (
    <div>
      <CustomDrodown
        activeCategory={activeCategory}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        dropdownListData={dropdownListData}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default Categories;
