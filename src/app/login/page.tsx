"use client";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import Image from "next/image";
import { useForm } from "react-hook-form";
import LoginImage from "../../../public/assets/login.jpg";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <section className="m-auto flex__center flex-col w-[90%] lg:max-w-[75%]">
      <div className="min-h-[500px] w-full grid  grid-cols-1 md:grid-cols-2 shadow-md rounded-2xl">
        <div className="sm:p-5 lg:p-10">
          <Image
            src={LoginImage}
            alt="slider"
            width={350}
            height={350}
            className="h-full w-full"
          />
        </div>
        <div className="p-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-y-10"
          >
            <h1 className="text-4xl font-semibold ">Log In</h1>
            <FormInput name={"email"} register={register} errors={errors} />
            <FormInput name={"passwod"} register={register} errors={errors} />
            <CustomButton text="Submit" path="submit" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
