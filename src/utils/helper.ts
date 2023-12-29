import { toast } from "sonner";

// notifications =============

export const sendNotifications = (type: string, message: string) => {
  if (type === "success")
    return toast.success(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#66bb6a",
        color: "white",
        border: "none",
      },
    });
  if (type === "warning")
    return toast.warning(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#fdd835",
        color: "white",
        border: "none",
      },
    });
  if (type === "error")
    return toast.error(message, {
      position: "top-center",
      duration: 2000,
      style: {
        backgroundColor: "#ff7043",
        color: "white",
        border: "none",
      },
    });
};

// localStoarge =====================

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
