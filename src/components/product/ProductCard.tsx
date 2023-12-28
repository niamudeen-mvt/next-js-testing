import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/utils/type";
import Rating from "./Rating";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart, selectCart } from "@/store/feature/cart/cartSlice";
import api from "@/utils/axios";
import { sendNotifications } from "@/utils/helper";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const { _id: id, price, rating, thumbnail, title, description } = product;
  const { products: cartProducts } = useAppSelector(selectCart);

  const handleAddtoCart = async () => {
    const productExist = cartProducts.findIndex((product) => product.id == id);

    if (productExist === -1) {
      try {
        let res = await api.post(`/cart/product/${id}`, product);
        if (res.status === 200) {
          sendNotifications("success", res.data.message);
        }
      } catch (error: any) {
        sendNotifications("error", error.response.data.message);
      }
    } else {
      console.log("product already exist");
    }
  };
  return (
    <div
      key={id}
      className="min-h-[350px] max-w-[280px] bg-gray-300/25 p-8 mx-auto"
    >
      <div className="h-[150px] w-full mb-4">
        <Image
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
          onClick={handleAddtoCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
