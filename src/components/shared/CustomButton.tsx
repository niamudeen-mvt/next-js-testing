import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  text?: string;
  path?: string;
};

const CustomButton = ({ text = "text", path = "submit" }: Props) => {
  const pathname = usePathname();
  return (
    <button
      className={`text-xs px-3 py-2 rounded-md ${
        pathname === path ? "active" : ""
      } ${path === "submit" ? "bg-blue-400 py-3 w-1/2 text-white" : ""}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
