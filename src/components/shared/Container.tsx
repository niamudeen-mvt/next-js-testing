import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:container w-full min-h-screen mx-auto px-5 flex flex-col justify-center">
      {children}
    </div>
  );
};

export default Container;
