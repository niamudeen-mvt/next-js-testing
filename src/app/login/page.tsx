"use client";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import LoginImage from "../../../public/assets/login.jpg";
import BasicFormLayout from "@/components/shared/BasicFormLayout";
import { useForm } from "react-hook-form";
import api from "@/utils/axios";
import { sendNotifications, storeInStorage } from "@/utils/helper";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const { setIsLoggedIn } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const { name: username, ...rest } = data;
      const payload = {
        username,
        ...rest,
      };
      const res = await api.post("/auth/login", payload);
      if (res.status === 200) {
        setIsLoggedIn(true);
        storeInStorage("userId", res.data.userId);
        storeInStorage("access_token", res.data.access_token);
        sendNotifications("success", res.data.message);
        router.push("/");
      }
    } catch (error: any) {
      sendNotifications("error", error.response.data.message);
    }
    reset();
  };

  return (
    <BasicFormLayout image={LoginImage}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-10"
      >
        <h1 className="text-4xl font-semibold">Log In</h1>
        <FormInput name={"email"} register={register} errors={errors} />
        <FormInput name={"password"} register={register} errors={errors} />
        <CustomButton text="Submit" path="submit" />
      </form>
    </BasicFormLayout>
  );
};

export default LoginForm;
