"use client";

type InputProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const CustomSearchInput = ({ searchValue, setSearchValue }: InputProps) => {
  const handleSearchProduct = () => {};
  return (
    <div className="w-full flex gap-x-4">
      <input
        type="text"
        className="pl-4 py-2 rounded-md w-1/2 border-2 border-gray-200 outline-none"
        placeholder="Searh here....."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="bg-blue-300 text-sm py-2 px-4 rounded-md"
        onClick={handleSearchProduct}
      >
        Search
      </button>
    </div>
  );
};

export default CustomSearchInput;
