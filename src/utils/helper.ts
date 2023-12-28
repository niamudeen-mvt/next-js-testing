import { toast } from "sonner";
import testImage from "../../public/assets/test.jpg";

export const sendNotifications = (type: string, message: string) => {
  if (type === "success")
    return toast.success(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#66bb6a",
        color: "white",
      },
    });
  if (type === "warning")
    return toast.warning(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#fdd835",
        color: "white",
      },
    });
  if (type === "error")
    return toast.error(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#ff7043",
        color: "white",
      },
    });
};

export const storeInStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};
export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};
export const clearStorage = () => {
  return localStorage.clear();
};

export const testProduct = {
  title: "test product",
  description: "test desc",
  thumbnail: testImage,
  category: "headset",
  rating: 5,
  price: 1500,
  images: [
    "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817602.jpg?w=740&t=st=1703751881~exp=1703752481~hmac=28bcb7c52a30aadb171fe76b6b27a9160b4d1a82f099ba4001a18841bf4d42f5",
  ],
};
