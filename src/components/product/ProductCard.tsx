import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/utils/type";
import Rating from "./Rating";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const { _id: id, price, rating, thumbnail, title, description } = product;

  return (
    <div
      key={id}
      className="min-h-[350px] max-w-[280px] bg-gray-300/25 p-8 mx-auto"
    >
      <div className="h-[150px] w-full mb-4">
        <Image
          priority={true}
          src={thumbnail}
          alt="thumbnail"
          width={100}
          height={100}
          className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-y-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold hover:text-blue-600 capitalize">
            {title}
          </h3>
        </Link>
        <p className="text-sm">{description}</p>
        <p className="text-sm font-semibold">${price}</p>
        <Rating rating={rating} />
        <button
          className={`bg-black text-white text-xs px-3 py-3 rounded-md hover:bg-black/75`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
