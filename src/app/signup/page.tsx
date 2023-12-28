"use client";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import { useForm } from "react-hook-form";
import LoginImage from "../../../public/assets/signup.jpg";
import BasicFormLayout from "@/components/shared/BasicFormLayout";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { sendNotifications } from "@/utils/helper";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { name: username, ...rest } = data;
      const payload = {
        username,
        ...rest,
      };
      const res = await api.post("/auth/register", payload);
      if (res.status === 201) {
        sendNotifications("success", res.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <BasicFormLayout image={LoginImage}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-5"
      >
        <h1 className="text-4xl font-semibold">Signup</h1>
        <FormInput name={"name"} register={register} errors={errors} />
        <FormInput name={"email"} register={register} errors={errors} />
        <FormInput name={"phone"} register={register} errors={errors} />
        <FormInput name={"password"} register={register} errors={errors} />
        <CustomButton text="Submit" path="submit" />
      </form>
    </BasicFormLayout>
  );
};

export default SignupForm;
