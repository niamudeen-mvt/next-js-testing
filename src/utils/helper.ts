import { toast } from "sonner";

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
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }
};
export const getFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};
export const clearStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.clear();
  }
};
