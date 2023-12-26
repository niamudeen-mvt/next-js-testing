import React from "react";

type Props = {
  text?: string;
  type?: string;
};

const CustomButton = ({ text = "text", type = "dark" }: Props) => {
  return (
    <button
      className={`${
        type === "light" ? "bg-white text-black" : "bg-black text-white"
      } font-medium text-xs px-3 py-2 rounded-md `}
    >
      {text}
    </button>
  );
};

export default CustomButton;
