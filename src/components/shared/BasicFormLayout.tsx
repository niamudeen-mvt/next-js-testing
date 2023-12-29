import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  image: StaticImageData;
};

const BasicFormLayout = ({ children, image }: Props) => {
  return (
    <section className="w-[90%] lg:max-w-[75%] m-auto flex__center flex-col">
      <div className="min-h-[500px] w-full grid  grid-cols-1 md:grid-cols-2 shadow-md rounded-2xl">
        <div className="relative h-[300px] md:h-full">
          <Image
            src={image}
            alt="slider"
            fill
            className="absolute inset-0"
            priority={true}
            loading="eager"
          />
        </div>
        <div className="p-10">{children}</div>
      </div>
    </section>
  );
};

export default BasicFormLayout;
