"use client";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import { useForm } from "react-hook-form";
import LoginImage from "../../../public/assets/login.jpg";
import BasicFormLayout from "@/components/shared/BasicFormLayout";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
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
