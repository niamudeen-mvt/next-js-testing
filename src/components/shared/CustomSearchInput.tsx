"use client";

import React from "react";

type InputProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

const CustomSearchInput = ({
  searchValue,
  setSearchValue,
  handleSearch,
}: InputProps) => {
  return (
    <div>
      <input
        type="text"
        className="border pl-4 py-2 rounded-md"
        placeholder="Searh here....."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="bg-blue-500 py-2 px-3 rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default CustomSearchInput;
